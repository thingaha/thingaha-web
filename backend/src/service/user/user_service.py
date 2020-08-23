import traceback
from typing import List, Dict, Any

from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash

from common.data_schema import user_schema
from common.error import SQLCustomError, RequestDataEmpty, ValidateFail
from common.logger import get_common_logger
from common.validate import InputValidate
from models.user import UserModel


class UserService:
    def __init__(self, logger=None) -> None:
        if logger is None:
            logger = get_common_logger(__name__)
        self.logger = logger
        self.input_validate = InputValidate

    def create_user(self, data: Dict[str, Any]) -> int:
        """
        create school records
        :param data:
        :return: created user id
        """
        if not data:
            raise RequestDataEmpty("user data is empty")
        if not self.input_validate.validate_json(data, user_schema):
            self.logger.error("All user field input must be required.")
            raise ValidateFail("User validation fail")
        try:
            return UserModel.create_user(UserModel(
                name=data["name"],
                email=data["email"],
                address_id=data["address_id"],
                hashed_password=generate_password_hash(data["password"]),
                role=data["role"],
                country=data["country"]))
        except SQLAlchemyError:
            self.logger.error("User create fail. email %s, error %s", data.get("email"), traceback.format_exc())
            raise SQLCustomError("Create User SQL Error")

    def update_user_by_id(self, user_id: int, data: Dict[str, Any]) -> bool:
        """
        update user by id
        :param user_id:
        :param data:
        :return:
        """
        if not data:
            raise RequestDataEmpty("user data is empty")
        if not self.input_validate.validate_json(data, user_schema):
            self.logger.error("All user field input must be required.")
            raise ValidateFail("User update validation fail")
        try:
            self.logger.info("update user info by id %s", user_id)
            return UserModel.update_user(user_id, UserModel(
                name=data["name"],
                email=data["email"],
                address_id=data["address_id"],
                hashed_password=generate_password_hash(data["password"]),
                role=data["role"],
                country=data["country"]))
        except SQLAlchemyError:
            self.logger.error("User update fail. id %s, error %s", user_id, traceback.format_exc())
            raise SQLCustomError(description="Update user by ID SQL ERROR")
        except SQLCustomError as e:
            self.logger.error("User update fail. id %s, error %s, custom error: %s", user_id, traceback.format_exc(), e)
            raise SQLCustomError(description="No record for requested user")

    def delete_user_by_id(self, user_id: int) -> bool:
        """
        delete user by id
        :param user_id:
        :return:
        """
        try:
            self.logger.info("delete user by id", user_id)
            return UserModel.delete_user(user_id)
        except SQLAlchemyError:
            self.logger.error("User delete fail. id %s, error %s", user_id, traceback.format_exc())
            raise SQLCustomError(description="Delete user by ID SQL ERROR")

    def get_all_users(self) -> List[Dict[str, Any]]:
        """
        get all users
        :return: users list of dict
        """
        self.logger.info("Get all users list")
        try:
            return self.__return_user_list(UserModel.get_all_users())
        except SQLAlchemyError:
            self.logger.error("Get all users fail. error %s", traceback.format_exc())
            raise SQLCustomError(description="GET user SQL ERROR")

    def get_users_by_name(self, name: int) -> List[Dict[str, Any]]:
        """
        get users by name
        :return: users list of dict
        """
        self.logger.info("Get users list by name %s", name)
        try:
            return self.__return_user_list(UserModel.get_users_by_name(name))
        except SQLAlchemyError:
            self.logger.error("Get users by name fail. name %s. error %s", name, traceback.format_exc())
            raise SQLCustomError(description="GET user by NAME SQL ERROR")

    def get_user_by_id(self, user_id: int) -> Dict[str, Any]:
        """
        get users by id
        :return: users list of dict
        """
        self.logger.info("Get users list by id %s", user_id)
        try:
            user = UserModel.get_user_by_id(user_id)
            return user.as_dict() if user else {}
        except SQLAlchemyError:
            self.logger.error("Get users by id fail. id %s. error %s", user_id, traceback.format_exc())
            raise SQLCustomError(description="GET user by ID SQL ERROR")

    @staticmethod
    def __return_user_list(users: List[UserModel]) -> List[Dict[str, Any]]:
        """
        return dict list for Users
        :param users:
        :return:
        """
        return [user.as_dict() for user in users]
