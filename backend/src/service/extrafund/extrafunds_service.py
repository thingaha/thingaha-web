"""address service layer for CRUD action"""
import traceback
from typing import Dict, Any, List

from flask import current_app
from sqlalchemy.exc import SQLAlchemyError

from common.data_schema import extrafunds_schema
from common.error import RequestDataEmpty, SQLCustomError, ValidateFail
from models.extrafunds import ExtrafundsModel
from service.service import Service
'''from service.school.transfer_service import TransferService'''

class ExtrafundsService(Service):
    """
    extrafund service class for CRUD actions
    define specific params for extrafund service in ExtrafundsService Class
    """
    def __init__(self, logger=None) -> None:
        super().__init__(logger)

    def create_extrafund(self, data: Dict[str, str]) -> bool:
        """
        create new extrafund
        :param data: data dict includes extrafund_id, mmk_amount, transfer_id
        :return: True if creation success else False
        """
        if not data:
            raise RequestDataEmpty("extrafunds data is empty")
        if not self.input_validate.validate_json(data, extrafunds_schema):
            self.logger.error("All extra field input must be required.")
            raise ValidateFail("extra validation fail")
        try:
            return ExtrafundsModel.create_extra_fund(ExtrafundsModel(
                mmk_amount=int(data["mmk_amount"]),
                transfer_id=int(data["transfer_id"])
            ))
        except SQLAlchemyError:
            self.logger.error("Extrafunds create fail. error %s", traceback.format_exc())
            raise SQLCustomError("Extrafunds create fail")

    def update_extrafund_by_id(self, extrafund_id: int, data: Dict[str, str]) -> bool:
        """
        update extrafund by id
        :param extrafund_id:
        :param data:
        :return:
        """
        if not extrafund_id or not data:
            raise RequestDataEmpty("extrafund data is empty")
        if not self.input_validate.validate_json(data, extrafunds_schema):
            self.logger.error("All extrafund field input must be required.")
            raise ValidateFail("Extrafund update validation fail")
        try:
            self.logger.info("update extrafund info by id %s", extrafund_id)
            return ExtrafundsModel.update_extrafund(extrafund_id, ExtrafundsModel(
                mmk_amount=int(data["mmk_amount"]),
                transfer_id=int(data["transfer_id"])
            ))
        except SQLAlchemyError as e:
            self.logger.error("extrafund update fail. id %s, error %s, custom error: %s", extrafund_id,
                              traceback.format_exc(), e)
            raise SQLCustomError(description="Update extrafund by ID SQL ERROR")
        except SQLCustomError as e:
            self.logger.error("Extrafund update fail. id %s, error %s, custom error: %s", extrafund_id,
                              traceback.format_exc(), e)
            raise SQLCustomError(description="No record for requested extrafund")

    def get_extrafund_by_id(self, extrafund_id: int) -> Dict[str, Any]:
        """
        get users by id
        :return: extrafund list of dict
        """
        self.logger.info("Get extrafund by id %s", extrafund_id)
        try:
            extrafund = ExtrafundsModel.get_extrafund_by_id(extrafund_id)
            return extrafund.as_dict() if extrafund else {}
        except SQLAlchemyError:
            self.logger.error("Get extrafund by id fail. id %s. error %s", extrafund_id, traceback.format_exc())
            raise SQLCustomError(description="GET extrafund by ID SQL ERROR")

    def delete_extrafund_by_id(self, extrafund_id: int) -> bool:
        """
        delete extrafund by id
        :param extrafund_id:
        :return:
        """
        try:
            self.logger.info("Delete extrafund by id", extrafund_id)
            return ExtrafundsModel.delete_extrafund(extrafund_id)
        except SQLAlchemyError:
            self.logger.error("Extrafund delete fail. id %s, error %s", extrafund_id, traceback.format_exc())
            raise SQLCustomError(description="Delete extrafund by ID SQL ERROR")

    def get_all_extrafunds(self) -> List[Dict[str, Any]]:
        """
        get all extrafunds
        :return:
        """
        self.logger.info("Get all extrafunds list")
        try:
            return [extrafunds.as_dict() for extrafunds in ExtrafundsModel.get_all_extrafunds()]
        except SQLAlchemyError:
            self.logger.error("Get all extrafunds fail. error %s", traceback.format_exc())
            raise SQLCustomError(description="GET extrafunds SQL ERROR")
