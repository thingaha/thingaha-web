import traceback
from typing import Dict, Any

from sqlalchemy.exc import SQLAlchemyError

from common.data_schema import address_schema
from common.error import RequestDataEmpty, SQLCustomError, ValidateFail
from common.logger import get_common_logger
from common.validate import InputValidate
from models.address import AddressModel


class AddressService:
    def __init__(self, logger=None) -> None:
        if logger is None:
            logger = get_common_logger(__name__)
        self.logger = logger
        self.input_validate = InputValidate

    def create_address(self, data: Dict[str, str]) -> bool:
        """
        create new address
        :param data: data dict includes division, district, township, street_address
        :return: True if creation success else False
        """
        if not data:
            raise RequestDataEmpty("address data is empty")
        if not self.input_validate.validate_json(data, address_schema):
            self.logger.error("All address field input must be required.")
            raise ValidateFail("Address validation fail")
        try:
            return AddressModel.create_address(AddressModel(
                division=data["division"],
                district=data["district"],
                township=data["township"],
                street_address=data["street_address"]))
        except SQLAlchemyError:
            self.logger.error("Address create fail. error %s", traceback.format_exc())
            raise SQLCustomError("Address create fail")

    def update_address_by_id(self, address_id: int, data: Dict[str, str]) -> bool:
        """
        update address by id
        :param address_id:
        :param data:
        :return:
        """
        if not address_id or not data:
            raise RequestDataEmpty("address data is empty")
        if not self.input_validate.validate_json(data, address_schema):
            self.logger.error("All address field input must be required.")
            raise ValidateFail("Address update validation fail")
        try:
            self.logger.info("update address info by id %s", address_id)
            return AddressModel.update_address(address_id, AddressModel(
                division=data["division"],
                district=data["district"],
                township=data["township"],
                street_address=data["street_address"]))
        except SQLAlchemyError as e:
            self.logger.error("Address update fail. id %s, error %s, custom error: %s", address_id, traceback.format_exc(), e)
            raise SQLCustomError(description="Update address by ID SQL ERROR")
        except SQLCustomError as e:
            self.logger.error("Address update fail. id %s, error %s, custom error: %s", address_id, traceback.format_exc(), e)
            raise SQLCustomError(description="No record for requested address")

    def get_address_by_id(self, address_id: int) -> Dict[str, Any]:
        """
        get users by id
        :return: address list of dict
        """
        self.logger.info("Get address by id %s", address_id)
        try:
            address = AddressModel.get_address_by_id(address_id)
            return address.as_dict() if address else {}
        except SQLAlchemyError:
            self.logger.error("Get address by id fail. id %s. error %s", address_id, traceback.format_exc())
            raise SQLCustomError(description="GET address by ID SQL ERROR")
