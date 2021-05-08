"""transfer model class, include migrate and CRUD actions"""
from __future__ import annotations

from datetime import datetime
from typing import Dict, Any

from flask_sqlalchemy import Pagination
from sqlalchemy import Column, DateTime, Integer, Enum, Float, desc
from sqlalchemy.exc import SQLAlchemyError

from common.error import SQLCustomError
from database import db


class TransferModel(db.Model):
    __tablename__ = "transfers"
    id = Column(Integer, primary_key=True)
    year = Column(Integer, nullable=False)
    month = Column(Enum("january", "february", "march", "april", "may", "june",
                        "july", "august", "september", "october", "november", "december", name="transfer_month"))
    total_mmk = Column(Float())
    total_jpy = Column(Float())
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    def __init__(self, year: int, month: str, total_mmk: float, total_jpy: float) -> None:
        self.year = year
        self.month = month
        self.total_mmk = total_mmk
        self.total_jpy = total_jpy

    def __repr__(self):
        return f"<Transfer record for {self.month}>"

    def as_dict(self) -> Dict[str, Any]:
        """
        Return object data in easily serializable format
        """
        return {
            "id": self.id,
            "year": self.year,
            "month": self.month,
            "total_mmk": self.total_mmk,
            "total_jpy": self.total_jpy
        }

    @staticmethod
    def create_transfer(new_transfer: TransferModel) -> bool:
        """
        create new transfer record
        :param new_transfer:
        :return: bool
        """
        try:
            db.session.add(new_transfer)
            db.session.commit()
            return new_transfer.id
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def get_all_transfers(page: int, per_page: int = 20) -> Pagination:
        """
        get all Transfer records
        :param: int
        :param: per_page
        :return: Transfer list
        """
        try:
            return db.session.query(TransferModel).order_by(desc(TransferModel.created_at)).paginate(page=page, per_page=per_page, error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_transfer_by_id(transfer_id: int) -> TransferModel:
        """
        get all transfer records
        :return: transfer list
        """
        try:
            return db.session.query(TransferModel).filter(TransferModel.id == transfer_id).first()
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def delete_transfer_by_id(transfer_id: int) -> bool:
        """
        delete transfer by id
        :param transfer_id:
        :return:
        """
        try:
            if not db.session.query(TransferModel).filter(TransferModel.id == transfer_id).delete():
                return False
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def update_transfer(transfer_id: int, transfer: TransferModel) -> bool:
        """
        update transfer info by id
        :param transfer_id:
        :param transfer:
        :return: bool
        """
        try:
            update_transfer = db.session.query(TransferModel).filter(TransferModel.id == transfer_id).first()
            if not update_transfer:
                raise SQLCustomError(description="No record for requested transfer")
            update_transfer.year = transfer.year
            update_transfer.month = transfer.month
            update_transfer.total_mmk = transfer.total_mmk
            update_transfer.total_jpy = transfer.total_jpy
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error
