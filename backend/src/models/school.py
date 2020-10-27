"""school model class, include migrate and CRUD actions"""
from __future__ import annotations

from typing import List, Dict, Any

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import relationship

from common.error import SQLCustomError
from database import db
from models.address import AddressModel


class SchoolModel(db.Model):
    """
    school Model class with table column definition
    """
    __tablename__ = "schools"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    contact_info = db.Column(db.String(), nullable=False)
    address_id = db.Column(db.Integer, db.ForeignKey("addresses.id"), nullable=False)
    address = relationship("AddressModel", foreign_keys=[address_id])

    def __init__(self, name: str, contact_info: str, address_id: int) -> None:
        self.name = name
        self.contact_info = contact_info
        self.address_id = address_id

    def __repr__(self):
        return f"<School {self.name}>"

    def school_dict(self) -> Dict[str, Any]:
        """
        Return object data in easily serializable format
        """
        return {
            "id": self.id,
            "name": self.name,
            "contact_info": self.contact_info,
            "address": {
                "id": self.address_id,
                "division": self.address.division,
                "district": self.address.district,
                "township": self.address.township,
                "street_address": self.address.street_address
            }
        }

    @staticmethod
    def create_school(new_school) -> bool:
        """
        create new_school
        :param new_school:
        :return: bool
        """
        try:
            db.session.add(new_school)
            db.session.commit()
            return new_school.id
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def get_all_schools() -> List[SchoolModel]:
        """
        get all school records
        :return: school list
        """
        try:
            return db.session.query(SchoolModel).join(AddressModel).all()
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_school_by_id(school_id: int) -> SchoolModel:
        """
        get all school records
        :return: school list
        """
        try:
            return db.session.query(SchoolModel).join(AddressModel).filter(SchoolModel.id == school_id)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def delete_school_by_id(school_id: int) -> bool:
        """
        delete school by id
        :param school_id:
        :return:
        """
        try:
            if not db.session.query(SchoolModel).filter(SchoolModel.id == school_id).delete():
                return False
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def update_school(school_id: int, school) -> bool:
        """
        update school info by id
        :param school_id:
        :param school:
        :return: bool
        """
        try:
            update_school = db.session.query(SchoolModel).filter(SchoolModel.id == school_id).first()
            if not update_school:
                raise SQLCustomError(description="No record for requested school")
            update_school.name = school.name
            update_school.contact_info = school.contact_info
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def get_all_school_address() -> dict:
        """
        get all school address for get all address API
        """
        try:
            return db.session.query(AddressModel, SchoolModel). \
                filter(AddressModel.id == SchoolModel.address_id).filter(AddressModel.type == "school").all()
        except SQLAlchemyError as error:
            raise error
