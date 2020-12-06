"""address service layer for CRUD action"""
import traceback
from typing import Dict, Any, List

from sqlalchemy.exc import SQLAlchemyError

from common.data_schema import extra_funds_schema
from common.error import RequestDataEmpty, SQLCustomError, ValidateFail
from models.extrafund import ExtraFundsModel
from service.service import Service


class ExtraFundsService(Service):
    """
    extra fund service class for CRUD actions
    define specific params for extra fund service in ExtraFundsService Class
    """
    def __init__(self, logger=None) -> None:
        super().__init__(logger)

    def create_extra_fund(self, data: Dict[str, str]) -> bool:
        """
        create new extra fund
        :param data: data dict includes extra fund_id, mmk_amount, transfer_id
        :return: True if creation success else False
        """
        if not data:
            raise RequestDataEmpty("Extra funds data is empty")
        if not self.input_validate.validate_json(data, extra_funds_schema):
            self.logger.error("All extra field input must be required.")
            raise ValidateFail("Extra validation fail")
        try:
            return ExtraFundsModel.create_extra_fund(ExtraFundsModel(
                mmk_amount=int(data["mmk_amount"]),
                transfer_id=int(data["transfer_id"])
            ))
        except SQLAlchemyError:
            self.logger.error("Extra funds create fail. error %s", traceback.format_exc())
            raise SQLCustomError("Extra funds create fail")

    def update_extra_fund_by_id(self, extra_fund_id: int, data: Dict[str, str]) -> bool:
        """
        update extra fund by id
        :param extra_fund_id:
        :param data:
        :return:
        """
        if not extra_fund_id or not data:
            raise RequestDataEmpty("Extra fund data is empty")
        if not self.input_validate.validate_json(data, extra_funds_schema):
            self.logger.error("All extra fund field input must be required.")
            raise ValidateFail("Extra fund update validation fail")
        try:
            self.logger.info("Update extra fund info by id %s", extra_fund_id)
            return ExtraFundsModel.update_extra_fund(extra_fund_id, ExtraFundsModel(
                mmk_amount=int(data["mmk_amount"]),
                transfer_id=int(data["transfer_id"])
            ))
        except SQLAlchemyError as e:
            self.logger.error("Extra fund update fail. id %s, error %s, custom error: %s", extra_fund_id,
                              traceback.format_exc(), e)
            raise SQLCustomError(description="Update extra fund by ID SQL ERROR")
        except SQLCustomError as e:
            self.logger.error("Extra fund update fail. id %s, error %s, custom error: %s", extra_fund_id,
                              traceback.format_exc(), e)
            raise SQLCustomError(description="No record for requested extra fund")

    def get_extra_fund_by_id(self, extra_fund_id: int) -> Dict[str, Any]:
        """
        get extra fund by id
        :return: extra fund list of dict
        """
        self.logger.info("Get extra fund by id %s", extra_fund_id)
        try:
            extra_fund = ExtraFundsModel.get_extra_fund_by_id(extra_fund_id)
            if not extra_fund:
                raise SQLCustomError(description="No data for requested extra funds id: {}".format(extra_fund_id))
            return extra_fund.as_dict()
        except SQLAlchemyError:
            self.logger.error("Get extra fund by id fail. id %s. error %s", extra_fund_id, traceback.format_exc())
            raise SQLCustomError(description="GET extra fund by ID SQL ERROR")

    def delete_extra_fund_by_id(self, extra_fund_id: int) -> bool:
        """
        delete extra fund by id
        :param extra_fund_id:
        :return:
        """
        try:
            self.logger.info("Delete extra fund by id", extra_fund_id)
            return ExtraFundsModel.delete_extra_fund(extra_fund_id)
        except SQLAlchemyError:
            self.logger.error("Extra fund delete fail. id %s, error %s", extra_fund_id, traceback.format_exc())
            raise SQLCustomError(description="Delete extra fund by ID SQL ERROR")

    def get_all_extra_funds(self, page: int = 1, per_page: int = 20) -> (List[Dict[str, Any]], int):
        """
        get all extra_funds
        :params page
        :params per_page
        :return:
        """
        self.logger.info("Get all extra funds list")
        try:
            extra_funds = ExtraFundsModel.get_all_extra_funds(page, per_page)
            return {
                "extra_funds": [extra_funds.as_dict() for extra_funds in extra_funds.items],
                "total_count": extra_funds.total,
                "current_page": extra_funds.page,
                "next_page": extra_funds.next_num,
                "prev_page": extra_funds.prev_num,
                "pages": extra_funds.pages,
                "new_transfers": self.get_new_transfers()
            }
        except SQLAlchemyError:
            self.logger.error("Get all extra funds fail. error %s", traceback.format_exc())
            raise SQLCustomError(description="GET extra funds SQL ERROR")

    def get_new_transfers(self) -> List[Dict[str, Any]]:
        """
        get all transfers which do not have extra fund ID
        :return:
        """
        self.logger.info("Get all new transfers list which do not have extra fund id")
        try:
            return [transfer.as_dict() for transfer in ExtraFundsModel.get_new_transfers()]
        except SQLAlchemyError:
            self.logger.error("Get all transfer fail. error %s", traceback.format_exc())
            raise SQLCustomError(description="GET transfer SQL ERROR")

