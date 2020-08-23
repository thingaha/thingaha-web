from __future__ import annotations

from typing import Dict, Any, List

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import relationship

from common.error import SQLCustomError
from database import db
from models.address import AddressModel


class UserModel(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    hashed_password = db.Column(db.Text(), nullable=True)
    role = db.Column(db.Enum("sub_admin", "donator", "admin", name="role"))
    country = db.Column(db.Enum("jp", "mm", "sg", "th", name="country"))
    address_id = db.Column(db.Integer, db.ForeignKey("addresses.id"), nullable=False)
    address = relationship("AddressModel", foreign_keys=[address_id])

    def __init__(self, name: str, email: str, address_id: int, role: str, country: str, hashed_password: str=None) -> None:
        self.name = name
        self.email = email
        self.address_id = address_id
        self.hashed_password = hashed_password
        self.role = role
        self.country = country

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
                "country": self.country
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
            target_user = db.session.query(UserModel).filter(UserModel.id == user_id).first()
            if not target_user:
                raise SQLCustomError("No record for requested school")
            target_user.name = user.name
            target_user.email = user.email
            target_user.address_id = user.address_id
            target_user.country = user.country
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
            return db.session.query(UserModel).filter(UserModel.id == user_id).first()
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
    def get_users_by_name(name) -> List[UserModel]:
        """
        get users by name (as name is not unique, multiple records can be returned)
        :param name:
        :return: user info list
        """
        try:
            return db.session.query(UserModel).join(AddressModel).filter(UserModel.name == name)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_all_users() -> List[UserModel]:
        """
        get all users
        :return: users list of dict
        """
        try:
            return db.session.query(UserModel).join(AddressModel).all()
        except SQLAlchemyError as error:
            raise error
