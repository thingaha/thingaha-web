"""attendance service class for CRUD actions"""
import traceback
from typing import List, Any, Optional, Dict

from sqlalchemy.exc import SQLAlchemyError

from common.data_schema import attendance_schema
from common.error import SQLCustomError, RequestDataEmpty, ValidateFail
from models.attendance import AttendanceModel
from service.service import Service


class AttendanceService(Service):
    """
    Attendance service class for CRUD actions
    define specific params for school service in SchoolService Class
    """
    def __init__(self, logger=None) -> None:
        super().__init__(logger)

    def get_all_attendances(self, page: int, grade: Optional[str], year: Optional[int], keyword: Optional[str], per_page: int = 20) -> (List, Any):
        """
        get all attendance
        :params page
        :params grade
        :params year
        :params keyword
        :params per_page
        :return: attendance list of dict
        """
        try:
            if year or grade or keyword:
                self.logger.info(f"Searching attendances: year: {year}, grade: {grade}, keyword: {keyword}")
                attendances = AttendanceModel.search_attendances(grade=grade, year=year, keyword=keyword, page=page, per_page=per_page)
            else:
                self.logger.info("Getting all attendances")
                attendances = AttendanceModel.get_all_attendances(page=page, per_page=per_page)

            return {
                "attendances": [attendance.attendance_dict(attendance.school, attendance.student) for attendance in
                                attendances.items],
                "total_count": attendances.total,
                "current_page": attendances.page,
                "next_page": attendances.next_num,
                "prev_page": attendances.prev_num,
                "pages": attendances.pages
            }
        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="GET Attendance SQL ERROR")

    def get_attendance_by_id(self, attendance_id: int) -> Optional[List]:
        """
        get attendance info by id
        :param attendance_id:
        :return: attendance list of dict
        """
        try:
            self.logger.info("Get attendance info by attendance_id:{}".format(attendance_id))
            attendance_by_id = AttendanceModel.get_attendance_by_id(attendance_id)
            if not attendance_by_id:
                raise SQLCustomError(description="No data for requested attendance id: {}".format(attendance_id))
            attendance, school, student = attendance_by_id
            return attendance.attendance_dict(school, student)
        except SQLAlchemyError:
            self.logger.error("Error: {}".format(traceback.format_exc()))
            raise SQLCustomError(description="GET Attendance by ID SQL ERROR")

    def create_attendance(self, data: Dict) -> bool:
        """
        create attendance records
        :param data:
        :return:
        """
        if not data:
            raise RequestDataEmpty("Attendance data is empty")
        if not self.input_validate.validate_json(data, attendance_schema):
            self.logger.error("All attendance field input must be required.")
            raise ValidateFail("Attendance validation fail")
        try:
            return AttendanceModel.create_attendance(AttendanceModel(**data))
        except SQLAlchemyError as error:
            self.logger.error("Attendance create fail. error %s, format: %s ", error, traceback.format_exc())
            raise SQLCustomError("Attendance create fail")

    def delete_attendance_by_id(self, attendance_id: int) -> bool:
        """
        delete attendance by id
        :param attendance_id:
        :return:
        """
        try:
            self.logger.info("Delete attendance info by attendance_id:{}".format(attendance_id))
            return AttendanceModel.delete_attendance_by_id(attendance_id)
        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="Delete attendance by ID SQL ERROR")

    def update_attendance_by_id(self, attendance_id: int, data: Dict) -> bool:
        """
        put attendance by id
        :param attendance_id:
        :param data:
        :return:
        """
        if not data:
            raise RequestDataEmpty("Attendance data is empty")
        if not self.input_validate.validate_json(data, attendance_schema):
            self.logger.error("All attendance field input must be required.")
            raise ValidateFail("Attendance update validation fail")
        try:
            self.logger.info("Update attendance info by attendance_id:{}".format(attendance_id))
            return AttendanceModel.update_attendance(attendance_id, AttendanceModel(**data))
        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="Update attendance by ID SQL ERROR")
        except SQLCustomError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="No record for requested attendance")

    @staticmethod
    def get_all_attendance_years() -> List[int]:
        """
        get all attendance
        :params page
        :params grade
        :params year
        :params per_page
        :return: attendance list of dict
        """
        return AttendanceModel.get_all_attendance_years()
