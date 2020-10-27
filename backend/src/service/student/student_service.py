"""student service class for CRUD actions"""

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
    def get_all_student_address():
        """
        get all school address for get all address API
        """
        return [address.address_type_dict(student) for address, student in StudentModel.get_all_student_address()]
