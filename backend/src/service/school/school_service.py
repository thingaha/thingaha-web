from typing import List, Any, Optional, Dict

from sqlalchemy.exc import SQLAlchemyError

from common.error import SQLCustomError, RequestDataEmpty, ValidateFail
from common.logger import get_common_logger
from common.validate import InputValidate
from common.data_schema import school_schema
from models.school import SchoolModel


class SchoolService:
    def __init__(self, logger=None) -> None:
        if logger is None:
            logger = get_common_logger(__name__)
        self.logger = logger
        self.input_validate = InputValidate

    def get_all_schools(self) -> (List, Any):
        """
        get all school
        :return: school list of dict
        """
        try:
            self.logger.info("Get school list")
            return self.__return_school_list(SchoolModel.get_all_schools())
        except SQLAlchemyError as e:
            self.logger.error("Error: {}".format(e))
            raise SQLCustomError(description="GET School SQL ERROR")

    def get_school_by_id(self, school_id: int) -> Optional[List]:
        """
        get school info by id
        :param school_id:
        :return: users list of dict
        """
        try:
            self.logger.info("get school info by school_id:{}".format(school_id))
            return self.__return_school_list(SchoolModel.get_school_by_id(school_id))
        except SQLAlchemyError as e:
            self.logger.error("Error: {}".format(e))
            raise SQLCustomError(description="GET School by ID SQL ERROR")

    @staticmethod
    def __return_school_list(query: list) -> List:
        """
        return list by query
        :param query:
        :return:
        """
        return [school.school_dict() for school in query]

    def create_school(self, data: Dict) -> bool:
        """
        create school records
        :param data:
        :return:
        """
        if not data:
            raise RequestDataEmpty("school data is empty")
        if not self.input_validate.validate_json(data, school_schema):
            self.logger.error("All school field input must be required.")
            raise ValidateFail("School validation fail")
        try:
            return SchoolModel.create_school(SchoolModel(
                name=data["school_name"],
                contact_info=data["contact_info"],
                address_id=int(data["address_id"])))
        except SQLAlchemyError as e:
            self.logger.error("School create fail. error %s", e)
            raise SQLCustomError("School create fail")

    def delete_school_by_id(self, school_id: int) -> bool:
        """
        delete school by id
        :param school_id:
        :return:
        """
        try:
            self.logger.info("delete school info by school_id:{}".format(school_id))
            return SchoolModel.delete_school_by_id(school_id)
        except SQLAlchemyError as e:
            self.logger.error("Error: {}".format(e))
            raise SQLCustomError(description="Delete school by ID SQL ERROR")

    def update_school_by_id(self, school_id: int, data: Dict) -> bool:
        """
        delete school by id
        :param school_id:
        :param data:
        :return:
        """
        if not data:
            raise RequestDataEmpty("school data is empty")
        if not self.input_validate.validate_json(data, school_schema):
            self.logger.error("All school field input must be required.")
            raise ValidateFail("School update validation fail")
        try:
            self.logger.info("update school info by school_id:{}".format(school_id))
            return SchoolModel.update_school(school_id, SchoolModel(
                name=data["school_name"],
                contact_info=data["contact_info"],
                address_id=data["address_id"]))
        except SQLAlchemyError as e:
            self.logger.error("Error: {}".format(e))
            raise SQLCustomError(description="Update school by ID SQL ERROR")
