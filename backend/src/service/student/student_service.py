import os
import traceback
from typing import List, Dict, Any, Optional

from botocore.exceptions import ClientError
from sqlalchemy.exc import SQLAlchemyError

from common.data_schema import student_schema
from common.error import SQLCustomError, RequestDataEmpty, ValidateFail
from models.student import StudentModel
from service.file_upload.file_upload_service import FileUploadService
from service.service import Service


class StudentService(Service):
    """
    student service class for CRUD actions
    define specific params for student service in StudentService Class
    """
    def __init__(self, logger=None) -> None:
        super().__init__(logger)
        self.ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg"]

    @staticmethod
    def __return_student_list(query: list) -> List:
        """
        return list by query
        :param query:
        :return:
        """
        return [student.student_dict() for student in query]

    def get_all_students(self, page: int = 1, per_page: int = 20) -> (List, Any):
        """
        get all student
        :params page
        :params per_page
        :return: student list of dict
        """
        try:
            self.logger.info("Get all students list")
            students = StudentModel.get_all_students(page, per_page)
            return {
                "students": self.__return_student_list(students.items),
                "total_count": students.total,
                "current_page": students.page,
                "next_page": students.next_num,
                "prev_page": students.prev_num,
                "pages": students.pages
            }
        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="GET Student SQL ERROR")

    def get_student_by_id(self, student_id: int) -> Optional[Dict]:
        """
        get student info by id
        :param student_id:
        :return: student list of dict
        """
        try:
            self.logger.info("Get student info by student_id:{}".format(student_id))
            student = StudentModel.get_student_by_id(student_id)
            if not student:
                raise SQLCustomError(description="No data for requested student id: {}".format(student_id))
            return student.student_dict()
        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="GET student by ID SQL ERROR")

    @staticmethod
    def get_students_by_address_ids(address_ids: tuple) -> Dict[int, StudentModel]:
        """
        get student info by address_ids
        :param address_ids:
        :return: student list of dict
        """
        try:
            students = StudentModel.get_student_by_address_ids(address_ids)
            return {student.address_id: student for student in students}
        except SQLAlchemyError:
            raise SQLCustomError(description="GET users by ids query SQL ERROR")

    def create_student(self, data: Dict[str, Any]) -> int:
        """
        create school records
        :param data:
        :return: created student id
        """
        if not data:
            raise RequestDataEmpty("Student data is empty")
        if not self.input_validate.validate_json(data, student_schema):
            self.logger.error("All student field input must be required.")
            raise ValidateFail("Student validation fail")
        try:
            uploaded_photo_url = self.upload_file(data["photo"]) if data.get("photo") else None
            return StudentModel.create_student(StudentModel(
                name=data["name"],
                deactivated_at=data["deactivated_at"],
                birth_date=data["birth_date"],
                father_name=data["father_name"],
                gender=data["gender"],
                mother_name=data["mother_name"],
                parents_occupation=data["parents_occupation"],
                photo=uploaded_photo_url,
                address_id=data["address_id"]))
        except SQLAlchemyError as error:
            self.logger.error("Student create fail. name %s, error %s, format: %s ", data["name"], error, traceback.format_exc())
            raise SQLCustomError("Student create fail")

    def delete_student_by_id(self, student_id: int) -> bool:
        """
        delete student by id
        :param student_id:
        :return:
        """
        try:
            self.logger.info("Delete student info by student_id:{}".format(student_id))
            return StudentModel.delete_student(student_id)
        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="Delete student by ID SQL ERROR")

    def update_student_by_id(self, student_id: int, data: Dict) -> bool:
        """
        put student by id
        :param student_id:
        :param data:
        :return:
        """
        if not data:
            raise RequestDataEmpty("Student data is empty")
        if not self.input_validate.validate_json(data, student_schema):
            self.logger.error("All student field input must be required.")
            raise ValidateFail("Student update validation fail")
        try:
            student = StudentModel.get_student_by_id(student_id)
            self.logger.info("Update student info by student_id:{}".format(student_id))

            old_photo_url = student.photo
            if data["photo"]:
                new_photo_url = self.upload_file(data["photo"])
            else:
                new_photo_url = None

            updated_student = StudentModel.update_student(student_id, StudentModel(
                name=data["name"],
                deactivated_at=data["deactivated_at"],
                birth_date=data["birth_date"],
                father_name=data["father_name"],
                mother_name=data["mother_name"],
                parents_occupation=data["parents_occupation"],
                gender=data["gender"],
                photo=new_photo_url or old_photo_url,
                address_id=data["address_id"]))

            if new_photo_url and old_photo_url:
                self.delete_file(old_photo_url)

            return updated_student

        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="Update student by ID SQL ERROR")
        except SQLCustomError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="No record for requested student")

    def update_photo_path_by_id(self, student_id: int, url: str) -> bool:
        """
        update student photo path by id
        :param student_id:
        :param url:
        :return:
        """
        if not student_id and not url:
            raise RequestDataEmpty("Student ID and url required to update the data")
        try:
            self.logger.info("Update student photo url by student_id:{}".format(student_id))
            return StudentModel.update_student_photo_url(student_id, url)
        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="Update student photo by ID SQL ERROR")
        except SQLCustomError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="No record for requested student")

    def get_students_by_query(self, page: int, query: str, per_page: int = 20) -> (List[Dict[str, Any]], int):
        """
        get student by query (name, father_name, mother_name and parents_occupation)
        :param query
        :param page
        :param per_page
        :return: users list of dict
        """
        self.logger.info("Get students list by query %s", query)
        try:
            students = StudentModel.get_students_by_query(page, query, per_page)
            return {
                "students": self.__return_student_list(students.items),
                "total_count": students.total,
                "current_page": students.page,
                "next_page": students.next_num,
                "prev_page": students.prev_num,
                "pages": students.pages
            }
        except SQLAlchemyError:
            self.logger.error("Get students by name fail. query %s. error %s", query,
                              traceback.format_exc())
            raise SQLCustomError(description="GET students by query SQL ERROR")

    def allowed_file(self, filename: str) -> Optional[str]:
        """
        check file name extension
        :params: filename : str
        return: True or False
        """
        file_extension = filename.rsplit(".", 1)[1].lower()
        if "." in filename and file_extension in self.ALLOWED_EXTENSIONS:
            return file_extension
        return None

    @staticmethod
    def __is_dev():
        """
        check env
        """
        return os.environ.get("SCRIPT_ENV") != "production"

    def delete_file(self, url: str) -> bool:
        """
        delete image file
        :params: url : str
        return: True or False
        """
        try:
            file_upload_service = FileUploadService()
            result = file_upload_service.delete_uploaded_file(url)

            if result:
                return True
            else:
                return False
        except ClientError as error:
            self.logger.error("File delete error %s", error)
            return False

    @staticmethod
    def upload_file(photo_file) -> Optional[str]:
        """
        upload file to S3
        :params photo_file : image object
        return: True or False
        """
        file_upload_service = FileUploadService()
        result = file_upload_service.upload(photo_file)

        if result:
            return file_upload_service.uploaded_path
        else:
            return None

    @staticmethod
    def get_all_student_ids() -> List[int]:
        """
        get all student ids for checking
        """
        return StudentModel.get_all_student_ids()
