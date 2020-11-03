"""extrafunds model class, include migrate and CRUD actions"""
from __future__ import annotations

from typing import List, Dict, Any

from flask import current_app
from sqlalchemy.exc import SQLAlchemyError

from common.error import SQLCustomError
from database import db


class ExtrafundsModel(db.Model):
    __tablename__ = "extrafunds"

    id = db.Column(db.Integer, primary_key=True)
    mmk_amount = db.Column(db.Float())
    transfer_id = db.Column(db.Integer, nullable=False)

    def __init__(self, mmk_amount: float, transfer_id: int) -> None:
        self.mmk_amount = mmk_amount
        self.transfer_id = transfer_id

    def __repr__(self):
        return f"<Extrafund record for {self.mmk_amount}>"

    def as_dict(self) -> Dict[str, Any]:
        """
        Return object data in easily serializable format
        """
        return {
            "id": self.id,
            "mmk_amount": self.mmk_amount,
            "transfer_id": self.transfer_id
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
    def get_all_extrafunds() -> List[ExtrafundsModel]:
        """
        get all Extrafunds records
        :return: Extrafunds list
        """
        try:
            return db.session.query(ExtrafundsModel).all()
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def update_extrafund(extrafund_id: int, extrafunds) -> bool:
        """
        update extrafund info by id
        :param extrafund_id:
        :param extrafunds:
        :return: bool
        """
        try:

            target_extrafund = db.session.query(ExtrafundsModel).filter(ExtrafundsModel.id == extrafund_id).first()
            if not target_extrafund:
                raise SQLCustomError("No record for requested extrafund")
            target_extrafund.mmk_amount = extrafunds.mmk_amount
            target_extrafund.transfer_id = extrafunds.transfer_id
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def get_extrafund_by_id(extrafund_id: int) -> ExtrafundsModel:
        """
        get extrafund by id
        :param extrafund_id:
        :return: extrafund info
        """
        try:
            return db.session.query(ExtrafundsModel).filter(ExtrafundsModel.id == extrafund_id).first()
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def delete_extrafund(extrafund_id) -> bool:
        """
        delete extrafund by id
        :param extrafund_id:
        :return: bool
        """
        try:
            if not db.session.query(ExtrafundsModel).filter(ExtrafundsModel.id == extrafund_id).delete():
                return False
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error
