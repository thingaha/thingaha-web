from typing import List, Dict, Any

from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash

from common.data_schema import student_schema
from common.error import SQLCustomError, RequestDataEmpty, ValidateFail
from common.logger import get_common_logger
from common.validate import InputValidate
from models.student import StudentModel
from service.service import Service

class StudentService(Service):
    """
    student service class for CRUD actions
    define specific params for student service in StudentService Class
    """
    def __init__(self, logger=None) -> None:
        super().__init__(logger)

    @staticmethod
    def get_all_student_address(page: int = 1) -> (List[Dict], int):
        """
        get all school address for get all address API
        :params page integer
        :return
        """
        students_address = StudentModel.get_all_student_address(page)
        return [address.address_type_dict(student) for address, student in students_address.items], students_address.total

    # def __init__(self, logger=None) -> None:
    #     if logger is None:
    #         logger = get_common_logger(__name__)
    #     self.logger = logger
    #     self.input_validate = InputValidate

    def create_student(self, data: Dict[str, Any]) -> int:
        """
        create school records
        :param data:
        :return: created student id
        """
        if not data:
            raise RequestDataEmpty("student data is empty")
        if not self.input_validate.validate_json(data, student_schema):
            self.logger.error("All student field input must be required.")
            raise ValidateFail("Student validation fail")
        try:
            return StudentModel.create_student(StudentModel(
                name=data["name"],
                deactivated_at=data["deactivated_at"],
                birth_date = data["birth_date"],
                father_name = data["father_name"],
                mother_name = data["mother_name"],
                parents_occupation = data["parents_occupation"],
                address_id=data["address_id"]))
        except SQLAlchemyError:
            self.logger.error("Student create fail. name %s, error %s", data.get("name"), traceback.format_exc())
            raise SQLCustomError("Create Student SQL Error")