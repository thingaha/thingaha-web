"""address model class, include migrate and CRUD actions"""

from __future__ import annotations

from typing import Dict, Any

from flask_sqlalchemy import Pagination
from sqlalchemy.exc import SQLAlchemyError

from common.error import SQLCustomError
from database import db


class AddressModel(db.Model):
    """
    address Model class with table column definition
    """
    __tablename__ = "addresses"

    id = db.Column(db.Integer, primary_key=True)
    division = db.Column(db.Enum("yangon", "ayeyarwady", "chin", "kachin", "kayah",
                                 "kayin", "mon", "rakhine", "shan", "bago", "magway",
                                 "mandalay", "sagaing", "tanintharyi",
                                 name="division"))
    district = db.Column(db.UnicodeText())
    township = db.Column(db.UnicodeText())
    street_address = db.Column(db.UnicodeText())
    type = db.Column(db.Enum("user", "student", "school", name="addresses_types"), default="user", nullable=False)

    def __repr__(self):
        return f"<Address {self.format_address()}>"

    def __init__(self, division: str, district: str, township: str, street_address: str, type: str = "user") -> None:
        self.division = division
        self.district = district
        self.township = township
        self.street_address = street_address
        self.type = type

    def format_address(self):
        """
        format address to user readable format
        :return:
        """
        return ", ".join(filter(lambda x: x is not None and x != "",
                                [self.street_address, self.township,
                                 self.district, self.division]))

    def as_dict(self) -> Dict[str, Any]:
        """
        Return object data in easily serializable format
        """
        return {
            "id": self.id,
            "division": self.division,
            "type": self.type,
            "district": self.district,
            "township": self.township,
            "street_address": self.street_address
        }

    @staticmethod
    def create_address(new_address) -> (int, bool):
        """
        create new_address for student
        :param new_address:
        :return: bool
        """
        try:
            db.session.add(new_address)
            db.session.commit()
            return new_address.id
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def update_address(address_id: int, address) -> bool:
        """
        update address info by id
        :param address_id:
        :param address:
        :return: bool
        """
        try:
            target_address = db.session.query(AddressModel).filter(AddressModel.id == address_id).first()
            if not target_address:
                raise SQLCustomError("No record for requested address")
            target_address.division = address.division
            target_address.district = address.district
            target_address.township = address.township
            target_address.street_address = address.street_address
            target_address.type = address.type
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def get_address_by_id(address_id: int) -> AddressModel:
        """
        get address by id
        :param address_id:
        :return: address info
        """
        try:
            return db.session.query(AddressModel).filter(AddressModel.id == address_id).first()
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_all_addresses(page: int = 1, per_page: int = 20) -> Pagination:
        """
        get all address record
        :param page:
        :param per_page:
        :return: get all address info
        """
        try:
            return db.session.query(AddressModel).paginate(page=page, per_page=per_page, error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def delete_address(address_id) -> bool:
        """
        delete address by id
        :param address_id:
        :return: bool
        """
        try:
            if not db.session.query(AddressModel).filter(AddressModel.id == address_id).delete():
                return False
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error
