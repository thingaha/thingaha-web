"""user model class, include migrate and CRUD actions"""

from __future__ import annotations

from datetime import datetime
from typing import Dict, Any, List

from flask_sqlalchemy import Pagination
from sqlalchemy import and_, or_, desc, Column, Integer, DateTime, Text, Boolean, ForeignKey, String, Enum
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
    id = Column(Integer, primary_key=True)
    display_name = Column(String, nullable=False)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(Text, nullable=True)
    role = Column(Enum("sub_admin", "donator", "admin", name="role"))
    country = Column(String, nullable=True)
    donation_active = Column(Boolean, default=False)
    address_id = Column(Integer, ForeignKey("addresses.id"), nullable=False)
    address = relationship("AddressModel", foreign_keys=[address_id])
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    def __init__(self, display_name: str, username: str, email: str, address_id: int, role: str, country: str,
                 hashed_password: str = None, donation_active: bool = False) -> None:
        self.display_name = display_name
        self.username = username
        self.email = email
        self.address_id = address_id
        self.hashed_password = hashed_password
        self.role = role
        self.country = country
        self.donation_active = donation_active

    def __repr__(self):
        return f"<User {self.username}>"

    def as_dict(self) -> Dict[str, Any]:
        """
        Return object data in easily serializable format
        """
        return {
                "id": self.id,
                "display_name": self.display_name,
                "username": self.username,
                "email": self.email,
                "formatted_address": self.address.format_address(),
                "address": self.address.as_dict(),
                "role": self.role,
                "country": self.country,
                "donation_active": self.donation_active
            }

    @staticmethod
    def create_user(new_user: UserModel) -> int:
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
    def update_user(user_id: int, user: UserModel) -> bool:
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
            target_user.display_name = user.display_name
            target_user.username = user.username
            target_user.email = user.email
            target_user.country = user.country
            target_user.role = user.role
            target_user.donation_active = user.donation_active
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def delete_user(user_id: int) -> bool:
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
    def get_users_by_address_ids(address_ids: tuple) -> List[UserModel]:
        """
        get user by ids
        :param address_ids:
        :return: user infos
        """
        try:
            return db.session.query(UserModel).filter(UserModel.address_id.in_(address_ids)).all()
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
    def get_user_by_username(username: str) -> UserModel:
        """
        get user by username
        :param username:
        :return: user info
        """
        try:
            return db.session.query(UserModel).filter(UserModel.username == username).first()
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_users_by_query(page: int, query: str, per_page: int = 20) -> Pagination:
        """
        get users by name (as name is not unique, multiple records can be returned)
        :param page:
        :param query:
        :param per_page int
        :return: user info list
        """
        try:
            return db.session.query(UserModel).\
                join(AddressModel).filter(or_(UserModel.display_name.ilike('%' + query + '%'),
                                              UserModel.email.ilike('%' + query + '%'))).paginate(
                page=page,
                per_page=per_page,
                error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_all_users(page: int = 1, per_page: int = 20) -> Pagination:
        """
        get all users
        :page integer
        :per_page int
        :return: users list of dict
        """
        try:
            return db.session.query(UserModel).join(AddressModel).paginate(page=page, per_page=per_page,
                                                                           error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_users_by_role(page: int, role: str, per_page: int = 20) -> Pagination:
        """
        get all users by role
        :params integer
        :role str
        :per_page int
        :return: users list of Pagination
        """
        try:
            return db.session.query(UserModel).join(AddressModel).filter(
                UserModel.role == role).order_by(desc(UserModel.created_at)).paginate(page=page, per_page=per_page, error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_users_by_country(page: int, country: str, per_page: int = 20) -> Pagination:
        """
        get all users by country
        :params integer
        :country str
        :per_page int
        :return: users list of dict
        """
        try:
            return db.session.query(UserModel).join(AddressModel).filter(
                UserModel.country == country).paginate(page=page, per_page=per_page, error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_users_by_role_country(page: int, role: str, country: str, per_page: int = 20) -> Pagination:
        """
        get all users by role and country
        :params page
        :params role
        :country role
        :per_page int
        :return: user info list
        """
        try:
            return db.session.query(UserModel).join(AddressModel).filter(
                and_(UserModel.country == country, UserModel.role == role)).paginate(page=page, per_page=per_page,
                                                                                     error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_all_user_address(page: int = 1, per_page: int = 20) -> Pagination:
        """
        get all user address for get all address API
        :params page
        :return Pagination Object
        """
        try:
            return db.session.query(AddressModel, UserModel). \
                filter(AddressModel.id == UserModel.address_id).filter(
                AddressModel.type == "user").paginate(page=page, per_page=per_page, error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def change_password(user_id: int, new_pwd: str) -> bool:
        """
        change password by userid
        :param user_id:
        :param new_pwd:
        :return: bool
        """
        try:
            db.session.query(UserModel).filter(UserModel.id == user_id).\
                         update({UserModel.hashed_password: new_pwd})
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def change_password_email(email: str, new_pwd: str) -> bool:
        """
        change password by user_email
        :param email:
        :param new_pwd:
        :return: bool
        """
        try:
            db.session.query(UserModel).filter(UserModel.email == email). \
                update({UserModel.hashed_password: new_pwd})
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error
