import traceback
import os
from typing import List, Dict, Any, Optional, Union

from sqlalchemy.exc import SQLAlchemyError
from botocore.exceptions import ClientError
from common.data_schema import student_schema
from common.error import SQLCustomError, RequestDataEmpty, ValidateFail
from models.student import StudentModel
from service.service import Service
from common.aws_client import get_client, get_s3_url, get_bucket
from common.config import S3_BUCKET, load_config
conf = load_config()
class StudentService(Service):
    
    """
    student service class for CRUD actions
    define specific params for student service in StudentService Class
    """
    def __init__(self, logger=None) -> None:
        super().__init__(logger)

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
            return StudentModel.create_student(StudentModel(
                name=data["name"],
                deactivated_at=data["deactivated_at"],
                birth_date=data["birth_date"],
                father_name=data["father_name"],
                mother_name=data["mother_name"],
                parents_occupation=data["parents_occupation"],
                photo=data["photo"],
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
            self.logger.info("Update student info by student_id:{}".format(student_id))
            return StudentModel.update_student(student_id, StudentModel(
                name=data["name"],
                deactivated_at=data["deactivated_at"],
                birth_date=data["birth_date"],
                father_name=data["father_name"],
                mother_name=data["mother_name"],
                parents_occupation=data["parents_occupation"],
                photo=data["photo"],
                address_id=data["address_id"]))
        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="Update student by ID SQL ERROR")
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

    def delete_file(self,url: str) -> bool:
        """
        delete image file
        :params: url : str
        return: True or False
        """
        try:
            key = url.split("/")[-1]
            if os.environ.get("SCRIPT_ENV") != "production":
                os.remove(os.path.join(self.get_local_uploads_path(), key))
                return True
            else:
                my_bucket = get_bucket()
                my_bucket.Object(key).delete()
                return True
        except Exception as error:
            self.logger.error("File delete error %s", error)
            return False


    def upload_file(self,img, file_name: str) -> bool:
        """
        upload file to S3
        :params img : image object
        :file_name : file name str
        return: True or False
        """
        try:
            if os.environ.get("SCRIPT_ENV") != "production":
                img.save(os.path.join(self.get_local_uploads_path(), file_name))
                return self.get_local_uploads_url().format(file_name)
            else:
                s3_client = get_client()
                s3_client.upload_fileobj(img, S3_BUCKET, file_name, ExtraArgs={"ACL": "public-read"})
                return get_s3_url().format(S3_BUCKET, file_name)
        except Exception as error:
            self.logger.error("File upload error %s", error)
            return ""

    def get_local_uploads_path(self):
        """
        get local upload path
        """
        return conf["common"]["local_photo"]["dir"]

    def get_local_uploads_url(self):
        """
        get local upload path
        """
        url = ("http://{}:{}/{}".format( 
            conf["common"]["server"]["host"], 
            conf["common"]["server"]["port"], 
            conf["common"]["local_photo"]["url"]))
        return url
