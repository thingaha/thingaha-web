"""school service class for CRUD actions"""
from typing import List, Any, Optional, Dict

from sqlalchemy.exc import SQLAlchemyError

from common.data_schema import school_schema
from common.error import SQLCustomError, RequestDataEmpty, ValidateFail
from models.school import SchoolModel
from service.service import Service


class SchoolService(Service):
    """
    school service class for CRUD actions
    define specific params for school service in SchoolService Class
    """
    def __init__(self, logger=None) -> None:
        super().__init__(logger)

    def get_all_schools(self) -> (List, Any):
        """
        get all school
        :return: school list of dict
        """
        try:
            self.logger.info("Get school list")
            return self.__return_school_list(SchoolModel.get_all_schools())
        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="GET School SQL ERROR")

    def get_school_by_id(self, school_id: int) -> Optional[List]:
        """
        get school info by id
        :param school_id:
        :return: school list of dict
        """
        try:
            self.logger.info("Get school info by school_id:{}".format(school_id))
            return self.__return_school_list(SchoolModel.get_school_by_id(school_id))
        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
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
            raise RequestDataEmpty("School data is empty")
        if not self.input_validate.validate_json(data, school_schema):
            self.logger.error("All school field input must be required.")
            raise ValidateFail("School validation fail")
        try:
            return SchoolModel.create_school(SchoolModel(
                name=data["school_name"],
                contact_info=data["contact_info"],
                address_id=int(data["address_id"])))
        except SQLAlchemyError as error:
            self.logger.error("School create fail. error %s", error)
            raise SQLCustomError("School create fail")

    def delete_school_by_id(self, school_id: int) -> bool:
        """
        delete school by id
        :param school_id:
        :return:
        """
        try:
            self.logger.info("Delete school info by school_id:{}".format(school_id))
            return SchoolModel.delete_school_by_id(school_id)
        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="Delete school by ID SQL ERROR")

    def update_school_by_id(self, school_id: int, data: Dict) -> bool:
        """
        update school by id
        :param school_id:
        :param data:
        :return:
        """
        if not data:
            raise RequestDataEmpty("School data is empty")
        if not self.input_validate.validate_json(data, school_schema):
            self.logger.error("All school field input must be required.")
            raise ValidateFail("School update validation fail")
        try:
            self.logger.info("update school info by school_id:{}".format(school_id))
            return SchoolModel.update_school(school_id, SchoolModel(
                name=data["school_name"],
                contact_info=data["contact_info"],
                address_id=data["address_id"]))
        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="Update school by ID SQL ERROR")
        except SQLCustomError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="No record for requested school")

    @staticmethod
    def get_all_school_address():
        """
        get all school address for get all address API
        """
        return [address.address_type_dict(school) for address, school in SchoolModel.get_all_school_address()]
