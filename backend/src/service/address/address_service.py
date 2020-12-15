"""address service layer for CRUD action"""
import traceback
from typing import Dict, Any, List, Optional, Tuple

from flask_sqlalchemy import Pagination
from sqlalchemy.exc import SQLAlchemyError

from common.data_schema import address_schema
from common.error import RequestDataEmpty, SQLCustomError, ValidateFail, ThingahaCustomError
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

    @staticmethod
    def __return_address_types(page: int, per_page: int, address_type: str) -> Optional[Tuple[Pagination, Dict]]:
        """
        return address by requested types
        :params page
        :params :per_page
        """
        if address_type not in ["school", "user", "student"]:
            return None, None
        else:
            addresses = AddressModel.get_all_addresses_by_type(page, per_page, address_type)
            address_ids = tuple([address.id for address in addresses.items])
            if address_type == "school":
                return addresses, {address_type: SchoolService.get_schools_by_address_ids(address_ids)}
            if address_type == "user":
                return addresses, {address_type: UserService.get_user_by_address_ids(address_ids)}
            if address_type == "student":
                return addresses, {address_type: StudentService.get_students_by_address_ids(address_ids)}

    @staticmethod
    def __get_all_address_records(addresses: Pagination) -> Dict:
        """
        get all address records without types
        :params addresses
        """
        schools_address_ids = [address.id for address in addresses.items if address.type == "school"]
        users_address_ids = [address.id for address in addresses.items if address.type == "user"]
        students_address_ids = [address.id for address in addresses.items if address.type == "student"]
        return {
            "school": SchoolService.get_schools_by_address_ids(tuple(schools_address_ids)),
            "user": UserService.get_user_by_address_ids(tuple(users_address_ids)),
            "student": StudentService.get_students_by_address_ids(tuple(students_address_ids))
        }

    def get_all_addresses(self, page: int = 1, per_page: int = 20, address_type: str = None) -> (List[Dict[str, Any]], int):
        """
        get all addresses
        :params page int
        :params per_page int
        :params address_type int
        :return:
        """
        try:
            if address_type:
                addresses, address_records = self.__return_address_types(page, per_page, address_type)
            else:
                addresses = AddressModel.get_all_addresses(page, per_page)
                address_records = self.__get_all_address_records(addresses)
            if address_records is None:
                self.logger.error("Address type should be school or user or student")
                raise ThingahaCustomError("Address type should be school or user or student")
            return self.__return_addresses_with_format(addresses, address_records)
        except SQLAlchemyError:
            self.logger.error(
                "Get all addresses fail. error %s", traceback.format_exc())
            raise SQLCustomError(description="GET address SQL ERROR")

    @staticmethod
    def __return_addresses_with_format(addresses: Pagination, address_records: Dict) -> Dict[str, List]:
        """
        prepare return format for address get all API
        :params addresses
        :params address_records
        """
        try:
            return {
                "addresses": [{
                    "id": address.id,
                    "addressable": {
                        "id": address_records[address.type][address.id].id,
                        "name": address_records[address.type][address.id].username if address.type == "user" else
                        address_records[address.type][address.id].name,
                        "type": address.type
                    },
                    "division": address.division,
                    "district": address.district,
                    "township": address.township,
                    "street_address": address.street_address,
                } for address in addresses.items],
                "total_count": addresses.total,
                "current_page": addresses.page,
                "next_page": addresses.next_num,
                "prev_page": addresses.prev_num,
                "pages": addresses.pages
            }
        except KeyError:
            raise ThingahaCustomError("Address key mismatch error")

    @staticmethod
    def __return_address_list(addresses: List[AddressModel]) -> List[Dict[str, Any]]:
        """
        return dict list for Addresses
        :param addresses:
        :return:
        """
        return [address.as_dict() for address in addresses]

    def search_address_by_query(self, page: int, query: str, per_page: int = 20) -> (List[Dict[str, Any]], int):
        """
        get users by query (name, email)
        :param query
        :param page
        :param per_page
        :return: users list of dict
        """
        self.logger.info("Get users list by query %s", query)
        try:
            addresses = AddressModel.search_address_by_query(page, per_page, query)
            address_records = self.__get_all_address_records(addresses)
            return self.__return_addresses_with_format(addresses, address_records)
        except SQLAlchemyError:
            self.logger.error("Get users by name fail. query %s. error %s", query,
                              traceback.format_exc())
            raise SQLCustomError(description="GET user by query SQL ERROR")
