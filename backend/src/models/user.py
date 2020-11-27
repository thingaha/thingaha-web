"""user model class, include migrate and CRUD actions"""

from __future__ import annotations

from typing import Dict, Any, List

from flask_sqlalchemy import Pagination
from sqlalchemy import and_, or_
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import relationship

from common.error import SQLCustomError
from database import db
from models.address import AddressModel


class UserModel(db.Model):
    """
    User Model class with table column definition
    """
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    hashed_password = db.Column(db.Text(), nullable=True)
    role = db.Column(db.Enum("sub_admin", "donator", "admin", name="role"))
    country = db.Column(db.Enum("jp", "mm", "sg", "th", name="country"))
    donation_active = db.Column(db.Boolean, default=False)
    address_id = db.Column(db.Integer, db.ForeignKey("addresses.id"), nullable=False)
    address = relationship("AddressModel", foreign_keys=[address_id])

    def __init__(self, name: str, email: str, address_id: int, role: str, country: str,
                 hashed_password: str = None, donation_active: bool =False) -> None:
        self.name = name
        self.email = email
        self.address_id = address_id
        self.hashed_password = hashed_password
        self.role = role
        self.country = country
        self.donation_active = donation_active

    def __repr__(self):
        return f"<User {self.name}>"

    def as_dict(self) -> Dict[str, Any]:
        """
        Return object data in easily serializable format
        """
        return {
                "id": self.id,
                "name": self.name,
                "email": self.email,
                "formatted_address": self.address.format_address(),
                "address": self.address.as_dict(),
                "role": self.role,
                "country": self.country,
                "donation_active": self.donation_active
            }

    @staticmethod
    def create_user(new_user) -> int:
        """
        create new users
        :param new_user:
        :return: created user id
        """
        try:
            db.session.add(new_user)
            db.session.commit()
            return new_user.id
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def update_user(user_id, user) -> bool:
        """
        update user info by id
        :param user_id:
        :param user:
        :return: bool
        """
        try:
            target_user = db.session.query(UserModel).get(user_id)
            if not target_user:
                raise SQLCustomError("No record for requested school")
            target_user.name = user.name
            target_user.email = user.email
            target_user.address_id = user.address_id
            target_user.country = user.country
            target_user.donation_active = user.donation_active
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def delete_user(user_id) -> bool:
        """
        delete user by id
        :param user_id:
        :return: bool
        """
        try:
            if not db.session.query(UserModel).filter(UserModel.id == user_id).delete():
                return False
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def get_user_by_id(user_id: int) -> UserModel:
        """
        get user by id
        :param user_id:
        :return: user info
        """
        try:
            return db.session.query(UserModel).get(user_id)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_user_by_email(email: str) -> UserModel:
        """
        get user by email
        :param email:
        :return: user info
        """
        try:
            return db.session.query(UserModel).filter(UserModel.email == email).first()
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_users_by_query(query) -> List[UserModel]:
        """
        get users by name (as name is not unique, multiple records can be returned)
        :param query:
        :return: user info list
        """
        try:
            return db.session.query(UserModel).join(AddressModel).filter(or_(UserModel.name.ilike(query), UserModel.email.ilike(query))).all()
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_all_users(page: int) -> Pagination:
        """
        get all users
        :page integer
        :return: users list of dict
        """
        try:
            return db.session.query(UserModel).join(AddressModel).paginate(page=page, error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_users_by_role(page: int, role: str) -> Pagination:
        """
        get all users by role
        :params integer
        :role str
        :return: users list of dict
        """
        try:
            return db.session.query(UserModel).join(AddressModel).filter(
                UserModel.role == role).paginate(page=page, error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_users_by_country(page: int, country: str) -> Pagination:
        """
        get all users by country
        :params integer
        :country str
        :return: users list of dict
        """
        try:
            return db.session.query(UserModel).join(AddressModel).filter(
                UserModel.country == country).paginate(page=page, error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_users_by_role_country(page: int, role: str, country: str) -> List[UserModel]:
        """
        get all users by role and country
        :params page
        :params role
        :country role
        :return: user info list
        """
        try:
            return db.session.query(UserModel).join(AddressModel).filter(
                and_(UserModel.country == country, UserModel.role == role)).paginate(page=page, error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_all_user_address(page: int = 1) -> Pagination:
        """
        get all user address for get all address API
        :params page
        :return Pagination Object
        """
        try:
            return db.session.query(AddressModel, UserModel). \
                filter(AddressModel.id == UserModel.address_id).filter(
                AddressModel.type == "user").paginate(page=page, error_out=False)
        except SQLAlchemyError as error:
            raise error
