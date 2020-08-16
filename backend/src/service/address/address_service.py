import traceback
from typing import Dict

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
        if not self.input_validate.validate_address(data, address_schema):
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
