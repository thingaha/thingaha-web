"""student service class for CRUD actions"""

from typing import List, Dict

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
