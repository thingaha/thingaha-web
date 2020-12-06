"""extra funds model class, include migrate and CRUD actions"""
from __future__ import annotations

from typing import Dict, Any, List

from flask_sqlalchemy import Pagination
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import relationship

from common.error import SQLCustomError
from database import db
from models.transfer import TransferModel


class ExtraFundsModel(db.Model):
    __tablename__ = "extrafunds"

    id = db.Column(db.Integer, primary_key=True)
    mmk_amount = db.Column(db.Float())
    transfer_id = db.Column(db.Integer, db.ForeignKey("transfers.id"), nullable=False)
    transfer = relationship("TransferModel", foreign_keys=[transfer_id])

    def __init__(self, mmk_amount: float, transfer_id: int) -> None:
        self.mmk_amount = mmk_amount
        self.transfer_id = transfer_id

    def __repr__(self):
        return f"<Extra fund record for {self.mmk_amount}>"

    def as_dict(self) -> Dict[str, Any]:
        """
        Return object data in easily serializable format
        """
        return {
            "id": self.id,
            "mmk_amount": self.mmk_amount,
            "transfer": self.transfer.as_dict()
        }

    @staticmethod
    def create_extra_fund(new_extra_fund) -> bool:
        """
        create new extra fund for yen mmk price
        :param new_extra_fund:
        :return: bool
        """
        try:
            db.session.add(new_extra_fund)
            db.session.commit()
            return new_extra_fund.id
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def get_all_extra_funds(page: int = 1, per_page: int = 20) -> Pagination:
        """
        get all Extra funds records
        :params page
        :params per_page
        :return: Extra funds list
        """
        try:
            return db.session.query(ExtraFundsModel).join(TransferModel).paginate(page=page, per_page=per_page,
                                                                                  error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def update_extra_fund(extra_fund_id: int, extra_funds) -> bool:
        """
        update extra fund info by id
        :param extra_fund_id:
        :param extra_funds:
        :return: bool
        """
        try:

            target_extra_fund = db.session.query(ExtraFundsModel).filter(ExtraFundsModel.id == extra_fund_id).first()
            if not target_extra_fund:
                raise SQLCustomError("No record for requested extra fund")
            target_extra_fund.mmk_amount = extra_funds.mmk_amount
            target_extra_fund.transfer_id = extra_funds.transfer_id
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def get_extra_fund_by_id(extra_fund_id: int) -> ExtraFundsModel:
        """
        get extra fund by id
        :param extra_fund_id:
        :return: extra_fund info
        """
        try:
            return db.session.query(ExtraFundsModel).filter(ExtraFundsModel.id == extra_fund_id).first()
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def delete_extra_fund(extra_fund_id) -> bool:
        """
        delete extra fund by id
        :param extra_fund_id:
        :return: bool
        """
        try:
            if not db.session.query(ExtraFundsModel).filter(ExtraFundsModel.id == extra_fund_id).delete():
                return False
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def get_new_transfers() -> List[TransferModel]:
        """
        get all Transfer records which do not have extra fund ids
        :param: int
        :return: Transfer list
        """
        try:
            subquery = db.session.query(ExtraFundsModel.transfer_id)
            query = db.session.query(TransferModel)
            return query.filter(TransferModel.id.notin_(subquery))
        except SQLAlchemyError as error:
            raise error
