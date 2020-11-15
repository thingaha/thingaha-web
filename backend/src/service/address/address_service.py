"""address service layer for CRUD action"""
import traceback
from typing import Dict, Any, List

from sqlalchemy.exc import SQLAlchemyError

from common.data_schema import address_schema
from common.error import RequestDataEmpty, SQLCustomError, ValidateFail
from models.address import AddressModel
from service.school.school_service import SchoolService
from service.service import Service
from service.student.student_service import StudentService
from service.user.user_service import UserService


class AddressService(Service):
    """
    address service class for CRUD actions
    define specific params for address service in AddressService Class
    """

    def __init__(self, logger=None) -> None:
        super().__init__(logger)

    def create_address(self, data: Dict[str, str]) -> bool:
        """
        create new address
        :param data: data dict includes division, district, township, street_address
        :return: True if creation success else False
        """

        if not data:
            raise RequestDataEmpty("Address data is empty")
        if not self.input_validate.validate_json(data, address_schema):
            self.logger.error("All address field input must be required.")
            raise ValidateFail("Address validation fail")
        try:
            return AddressModel.create_address(AddressModel(
                division=data["division"],
                district=data["district"],
                township=data["township"],
                street_address=data["street_address"],
                type=data["type"]))
        except SQLAlchemyError:
            self.logger.error("Address create fail. error %s",
                              traceback.format_exc())
            raise SQLCustomError("Address create fail")

    def update_address_by_id(self, address_id: int, data: Dict[str, str]) -> bool:
        """
        update address by id
        :param address_id:
        :param data:
        :return:
        """
        if not address_id or not data:
            raise RequestDataEmpty("Address data is empty")
        if not self.input_validate.validate_json(data, address_schema):
            self.logger.error("All address field input must be required.")
            raise ValidateFail("Address update validation fail")
        try:
            self.logger.info("update address info by id %s", address_id)
            return AddressModel.update_address(address_id, AddressModel(
                division=data["division"],
                district=data["district"],
                township=data["township"],
                street_address=data["street_address"],
                type=data["type"]))
        except SQLAlchemyError as e:
            self.logger.error("Address update fail. id %s, error %s, custom error: %s", address_id,
                              traceback.format_exc(), e)
            raise SQLCustomError(description="Update address by ID SQL ERROR")
        except SQLCustomError as e:
            self.logger.error("Address update fail. id %s, error %s, custom error: %s", address_id,
                              traceback.format_exc(), e)
            raise SQLCustomError(description="No record for requested address")

    def get_address_by_id(self, address_id: int) -> Dict[str, Any]:
        """
        get users by id
        :return: address list of dict
        """
        self.logger.info("Get address by id %s", address_id)
        try:
            address = AddressModel.get_address_by_id(address_id)
            if not address:
                raise SQLCustomError(
                    description="No data for requested address id: {}".format(address_id))
            return address.as_dict()
        except SQLAlchemyError:
            self.logger.error(
                "Get address by id fail. id %s. error %s", address_id, traceback.format_exc())
            raise SQLCustomError(description="GET address by ID SQL ERROR")

    def delete_address_by_id(self, address_id: int) -> bool:
        """
        delete address by id
        :param address_id:
        :return:
        """
        try:
            self.logger.info("Delete address by id", address_id)
            return AddressModel.delete_address(address_id)
        except SQLAlchemyError:
            self.logger.error("Address delete fail. id %s, error %s",
                              address_id, traceback.format_exc())
            raise SQLCustomError(description="Delete address by ID SQL ERROR")

    def get_all_addresses(self, page: int = 1) -> (List[Dict[str, Any]], int):
        """
        get all addresses
        :params page
        :return:
        """
        self.logger.info("Get all addresses list")
        try:
            schools, schools_count = SchoolService.get_all_school_address(page)
            users, users_count = UserService.get_all_user_address(page)
            student, students_count = StudentService.get_all_student_address(
                page)
            return schools + users + student, schools_count+users_count+students_count
        except SQLAlchemyError:
            self.logger.error(
                "Get all addresses fail. error %s", traceback.format_exc())
            raise SQLCustomError(description="GET address SQL ERROR")

    @staticmethod
    def __return_address_list(addresses: List[AddressModel]) -> List[Dict[str, Any]]:
        """
        return dict list for Addresses
        :param addresses:
        :return:
        """
        return [address.as_dict() for address in addresses]
