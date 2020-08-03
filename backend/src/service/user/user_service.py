import traceback
from typing import List, Dict, Any, Optional

from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash

from common.logger import get_common_logger
from models.user import UserModel


class UserService:
    def __init__(self, logger=None) -> None:
        if logger is None:
            logger = get_common_logger(__name__)
        self.logger = logger

    def create_user(self, data: Dict[str, str]) -> bool:
        """
        create new user
        :param data: data dict includes name, email, address_id, password, role, country
        :return: True if creation success else False
        """
        if not data.get("name") or not data.get("email") or not data.get("address_id") or not data.get("password") or not data.get("role") or not data.get("country"):
            self.logger.error("All user field input must be required.")
            return False
        try:
            return UserModel.create_user(UserModel(name=data["name"], email=data["email"], address_id=int(data["address_id"]),
                                         hashed_password=generate_password_hash(data["password"]), role=data["role"],
                                         country=data["country"]))
        except SQLAlchemyError:
            self.logger.error("User create fail. email %s, error %s", data["email"], traceback.format_exc())
            return False

    def update_user(self, data: Dict[str, str]) -> bool:
        """
        update user info
        :param data: data dict includes name, email, address_id, role, country
        :return: True if update success else False
        """
        if not data.get("id") or not data.get("name") or not data.get("email") or not data.get("address_id") or not data.get("role") or not data.get("country"):
            self.logger.error("All user field input must be required.")
            return False
        try:
            return UserModel.update_user(data["id"], UserModel(name=data["name"], email=data["email"], address_id=int(data["address_id"]), role=data["role"],
                                         country=data["country"]))
        except SQLAlchemyError:
            self.logger.error("User create fail. email %s, error %s", data["email"], traceback.format_exc())
            return False

    def delete_user(self, user_id: str) -> bool:
        """
        delete user by user_id
        """
        if not user_id:
            self.logger.error("user id is required.")
            return False
        if not user_id.isdigit():
            self.logger.error("user id must be integer.")
            return False
        self.logger.info("Delete user %s", user_id)
        return UserModel.delete_user(int(user_id))

    def get_all_users(self) -> List[Dict[str, Any]]:
        """
        get all users
        :return: users list of dict
        """
        self.logger.info("Get users list")
        return [user.as_dict()for user in UserModel.get_all_users()]

    def get_users_by_name(self, name: str) -> Optional[List[Dict[str, Any]]]:
        """
        get users by name
        :return: users list of dict
        """
        if not name:
            self.logger.error("name is required.")
            return None
        self.logger.info("Get users list by name %s", name)
        return [user.as_dict() for user in UserModel.get_users_by_name(name)]
