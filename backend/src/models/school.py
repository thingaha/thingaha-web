"""school model class, include migrate and CRUD actions"""
from __future__ import annotations

from datetime import datetime
from typing import Dict, Any, Tuple, List

from flask_sqlalchemy import Pagination
from sqlalchemy import or_, desc, DateTime, Column, String, Integer, ForeignKey
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

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    contact_info = Column(String, nullable=False)
    address_id = Column(Integer, ForeignKey("addresses.id"), nullable=False)
    address = relationship("AddressModel", foreign_keys=[address_id])
    photo = db.Column(db.Text, nullable=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    def __init__(self, name: str, contact_info: str, address_id: int, photo: str =None) -> None:
        self.name = name
        self.contact_info = contact_info
        self.address_id = address_id
        self.photo = photo

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
            "photo": self.photo,
            "address": {
                "id": self.address_id,
                "division": self.address.division,
                "district": self.address.district,
                "township": self.address.township,
                "street_address": self.address.street_address
            }
        }

    @staticmethod
    def create_school(new_school: SchoolModel) -> bool:
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
    def get_all_schools(page: int = 1, per_page: int = 20) -> Pagination:
        """
        get all school records
        :params page: int
        :return: school Pagination iterator
        """
        try:
            return db.session.query(SchoolModel).join(AddressModel).order_by(desc(SchoolModel.created_at)).paginate(page=page, per_page=per_page, error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_school_by_id(school_id: int) -> SchoolModel:
        """
        get all school records
        :return: school list
        """
        try:
            return db.session.query(SchoolModel).join(AddressModel).filter(SchoolModel.id == school_id).first()
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
    def update_school(school_id: int, school: SchoolModel) -> bool:
        """
        update school info by id
        :param school_id:
        :param school:
        :return: bool
        """
        try:
            update_school = db.session.query(SchoolModel).get(school_id)
            if not update_school:
                raise SQLCustomError(description="No record for requested school id: {}".format(school_id))
            update_school.name = school.name
            update_school.photo = school.photo
            update_school.contact_info = school.contact_info
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def get_schools_by_query(page: int, query: str, per_page: int = 20) -> Pagination:
        """
        search school info by query (name and contact info)
        :param page:
        :param query:
        :param per_page:
        :return: schools info list
        """

        try:
            return db.session.query(SchoolModel).join(AddressModel).filter(
                or_(SchoolModel.name.ilike('%' + query + '%'),
                    SchoolModel.contact_info.ilike('%' + query + '%'))).paginate(
                page=page,
                per_page=per_page,
                error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_schools_by_address_ids(school_ids: Tuple) -> List[SchoolModel]:
        """
        get school info by ids
        :param school_ids:
        :return: schools info list
        """
        try:
            return db.session.query(SchoolModel).filter(SchoolModel.address_id.in_(school_ids)).all()
        except SQLAlchemyError as error:
            raise error
