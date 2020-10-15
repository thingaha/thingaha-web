"""transfer service layer for CRUD action"""
import traceback
from typing import Dict, Any, List

from sqlalchemy.exc import SQLAlchemyError

from common.data_schema import transfer_schema
from common.error import RequestDataEmpty, SQLCustomError, ValidateFail
from models.transfer import TransferModel
from service.service import Service


class TransferService(Service):
    """
    transfer service class for CRUD actions
    define specific params for transfer service in Transfer Class
    """
    def __init__(self, logger=None) -> None:
        super().__init__(logger)

    def create_transfer(self, data: Dict[str, str]) -> bool:
        """
        create new transfer
        :param data: data dict includes year, month, jpy amount, mmk amount
        :return: True if creation success else False
        """
        if not data:
            raise RequestDataEmpty("Transfer data is empty")
        if not self.input_validate.validate_json(data, transfer_schema):
            self.logger.error("All scheme field input must be required.")
            raise ValidateFail("Transfer validation fail")
        try:
            return TransferModel.create_transfer(TransferModel(
                year=int(data["year"]),
                month=data["month"],
                total_jpy=int(data["total_jpy"]),
                total_mmk=int(data["total_mmk"])
                ))
        except SQLAlchemyError:
            self.logger.error("Transfer create fail. error %s", traceback.format_exc())
            raise SQLCustomError("Transfer create fail")

    def update_transfer_by_id(self, transfer_id: int, data: Dict[str, str]) -> bool:
        """
        update transfer by id
        :param transfer_id:
        :param data:
        :return:
        """
        if not transfer_id or not data:
            raise RequestDataEmpty("Transfer data is empty")
        if not self.input_validate.validate_json(data, transfer_schema):
            self.logger.error("All transfer field input must be required.")
            raise ValidateFail("Transfer update validation fail")
        try:
            self.logger.info("Update transfer info by id %s", transfer_id)
            return TransferModel.update_transfer(transfer_id, TransferModel(
                year=int(data["year"]),
                month=data["month"],
                total_jpy=int(data["total_jpy"]),
                total_mmk=int(data["total_mmk"])))
        except SQLAlchemyError as error:
            self.logger.error("Transfer update fail. id %s, error %s, custom error: %s", transfer_id,
                              traceback.format_exc(), error)
            raise SQLCustomError(description="Update transfer by ID SQL ERROR")
        except SQLCustomError as error:
            self.logger.error("Transfer update fail. id %s, error %s, custom error: %s", transfer_id,
                              traceback.format_exc(), error)
            raise SQLCustomError(description="No record for requested address")

    def get_transfer_by_id(self, transfer_id: int) -> Dict[str, Any]:
        """
        get users by id
        :param transfer_id:
        :return: transfer list of dict
        """
        self.logger.info("Get transfer record by id %s", transfer_id)
        try:
            transfer = TransferModel.get_transfer_by_id(transfer_id)
            return transfer.as_dict() if transfer else {}
        except SQLAlchemyError:
            self.logger.error("Get transfer record by id fail. id %s. error %s", transfer_id, traceback.format_exc())
            raise SQLCustomError(description="GET transfer by ID SQL ERROR")

    def delete_transfer_by_id(self, transfer_id: int) -> bool:
        """
        delete transfer by id
        :param transfer_id:
        :return:
        """
        try:
            self.logger.info("Delete transfer by id", transfer_id)
            return TransferModel.delete_transfer_by_id(transfer_id)
        except SQLAlchemyError:
            self.logger.error("Transfer delete fail. id %s, error %s", transfer_id, traceback.format_exc())
            raise SQLCustomError(description="Delete transfer by ID SQL ERROR")

    def get_all_transfers(self) -> List[Dict[str, Any]]:
        """
        get all transfers
        :return:
        """
        self.logger.info("Get all transfers list")
        try:
            return [transfer.as_dict() for transfer in TransferModel.get_all_transfers()]
        except SQLAlchemyError:
            self.logger.error("Get all transfer fail. error %s", traceback.format_exc())
            raise SQLCustomError(description="GET transfer SQL ERROR")
