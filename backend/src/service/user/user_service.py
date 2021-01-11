"""user service layer for CRUD action"""
import traceback
from typing import List, Dict, Any, Optional

from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash, check_password_hash

from common.data_schema import user_schema, user_update_schema, password_reset_schema, password_change_schema
from common.error import SQLCustomError, RequestDataEmpty, ValidateFail, ThingahaCustomError
from models.user import UserModel
from service.service import Service


class UserService(Service):
    """
    User Service Class for CRUD actions
    define specific params for user service in UserService Class
    """
    def __init__(self, logger=None) -> None:
        super().__init__(logger)

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
                display_name=data["display_name"],
                username=data["username"],
                email=data["email"],
                address_id=data["address_id"],
                hashed_password=generate_password_hash(data["password"]),
                role=data["role"],
                country=data["country"],
                donation_active=data["donation_active"]))
        except SQLAlchemyError:
            self.logger.error("User create fail. email %s, error %s", data.get("email"),
                              traceback.format_exc())
            raise SQLCustomError("Create User Error")

    def update_user_by_id(self, user_id: int, data: Dict[str, Any]) -> bool:
        """
        update user by id
        :param user_id:
        :param data:
        :return:
        """
        if not data:
            raise RequestDataEmpty("user data is empty")
        if not self.input_validate.validate_json(data, user_update_schema):
            self.logger.error("All user field input must be required.")
            raise ValidateFail("User update validation fail")
        try:
            self.logger.info("update user info by id %s", user_id)
            return UserModel.update_user(user_id, UserModel(
                display_name=data["display_name"],
                username=data["username"],
                email=data["email"],
                address_id=data["address_id"],
                role=data["role"],
                country=data["country"],
                donation_active=data["donation_active"]))
        except SQLAlchemyError:
            self.logger.error("User update fail. id %s, error %s", user_id, traceback.format_exc())
            raise SQLCustomError(description="Update user by ID SQL ERROR")
        except SQLCustomError as error:
            self.logger.error("User update fail. id %s, error %s, custom error: %s",
                              user_id, traceback.format_exc(), error)
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

    def get_all_users(self, page: int = 1, role: str = None, country: str = None, per_page: int = 20) -> (List[Dict[str, Any]], int):
        """
        get all users
        :params: page page count
        :params: role -> user role for filter
        :params: country -> country for filter
        :params: per_page
        :return: users list of dict
        """
        self.logger.info("Get all users list")
        try:
            if role and not country:
                users = UserModel.get_users_by_role(page, role, per_page)
            elif country and not role:
                users = UserModel.get_users_by_country(page, country, per_page)
            elif role and country:
                users = UserModel.get_users_by_role_country(page, role, country, per_page)
            else:
                users = UserModel.get_all_users(page, per_page)
            return {
                "users": self.__return_user_list(users.items),
                "total_count": users.total,
                "current_page": users.page,
                "next_page": users.next_num,
                "prev_page": users.prev_num,
                "pages": users.pages
            }
        except SQLAlchemyError:
            self.logger.error("Get all users fail. error %s", traceback.format_exc())
            raise SQLCustomError(description="GET user SQL ERROR")

    def get_users_by_query(self, page: int, query: str, per_page: int = 20) -> (List[Dict[str, Any]], int):
        """
        get users by query (name, email)
        :param query
        :param page
        :param per_page
        :return: users list of dict
        """
        self.logger.info("Get users list by query %s", query)
        try:
            users = UserModel.get_users_by_query(page, query, per_page)
            return {
                "users": self.__return_user_list(users.items),
                "total_count": users.total,
                "current_page": users.page,
                "next_page": users.next_num,
                "prev_page": users.prev_num,
                "pages": users.pages
            }
        except SQLAlchemyError:
            self.logger.error("Get users by name fail. query %s. error %s", query,
                              traceback.format_exc())
            raise SQLCustomError(description="GET user by query SQL ERROR")

    def get_user_by_id(self, user_id: int) -> Dict[str, Any]:
        """
        get users by id
        :return: users list of dict
        """
        self.logger.info("Get users list by id %s", user_id)
        try:
            user = UserModel.get_user_by_id(user_id)
            if not user:
                raise SQLCustomError(description="No data for requested user id: {}".format(user_id))
            return user.as_dict()
        except SQLAlchemyError:
            self.logger.error("Get users by id fail. id %s. error %s", user_id,
                              traceback.format_exc())
            raise SQLCustomError(description="GET user by ID SQL ERROR")

    @staticmethod
    def get_user_by_address_ids(address_ids: tuple) -> Dict[int, UserModel]:
        """
        get users by address ids
        :params: address_ids
        :return: users list of dict
        """
        try:
            users = UserModel.get_users_by_address_ids(address_ids)
            return {user.address_id: user for user in users}
        except SQLAlchemyError:
            raise SQLCustomError(description="GET users by ids query SQL ERROR")

    @staticmethod
    def check_password(password: str, user: UserModel):
        """
        check role for API call
        :param password:
        :param user:
        :return:
        """
        return check_password_hash(user.hashed_password, password)

    def get_user_by_email(self, email: str) -> Optional[UserModel]:
        """
        get user by email address
        :param email:
        :return:
        """
        self.logger.info("Get users list by email %s", email)
        try:
            user = UserModel.get_user_by_email(email)
            return user if user else None
        except SQLAlchemyError:
            self.logger.error("Get users by email fail. email %s. error %s", email,
                              traceback.format_exc())
            raise SQLCustomError(description="Get user by email SQL ERROR")

    def get_user_model_by_id(self, user_id: int) -> Optional[UserModel]:
        """
        get user by user_id
        :param user_id:
        :return:
        """
        try:
            user = UserModel.get_user_by_id(user_id)
            return user if user else None
        except SQLAlchemyError:
            self.logger.error("Get users by id fail. email %s. error %s", user_id,
                              traceback.format_exc())
            raise SQLCustomError(description="Get user by user_id SQL ERROR")

    def get_user_by_username(self, username: str) -> Optional[UserModel]:
        """

        :param username:
        :return:
        """
        self.logger.info("Get users list by username %s", username)
        try:
            user = UserModel.get_user_by_username(username)
            return user if user else None
        except SQLAlchemyError:
            self.logger.error("Get users by id fail. usename %s. error %s", username,
                              traceback.format_exc())
            raise SQLCustomError(description="Get user by username SQL ERROR")

    @staticmethod
    def __return_user_list(users: List[UserModel]) -> List[Dict[str, Any]]:
        """
        return dict list for Users
        :param users:
        :return:
        """
        return [user.as_dict() for user in users]

    def change_password_by_id(self, user_id: int, new_pwd: str) -> bool:
        """
        change password by userid
        :param user_id:
        :param new_pwd:
        :return:
        """
        self.logger.info("Change user password by id %s", user_id)
        try:
            return UserModel.change_password(user_id, generate_password_hash(new_pwd))
        except SQLAlchemyError:
            self.logger.error("Password change fail. id %s, error %s", user_id,
                              traceback.format_exc())
            raise SQLCustomError(description="Change password by ID SQL ERROR")

    def reset_password(self, data: Dict) -> bool:
        """
        reset password by full admin
        """
        if not self.input_validate.validate_json(data, password_reset_schema):
            self.logger.error("Reset password validation fail")
            raise ValidateFail("Reset password validation fail")
        user = self.get_user_model_by_id(data.get("user_id"))
        return self.change_password_by_id(user.id, data.get("password"))

    def change_password(self, user_id: int, data: Dict[str, str]) -> bool:
        """
        change password by user
        :params user_id
        :params data
        """
        if not self.input_validate.validate_json(data, password_change_schema):
            self.logger.error("Change password validation fail")
            raise ValidateFail("Change password validation fail")
        current_pwd = data.get("current_password")
        new_pwd = data.get("new_password")
        new_confirm_pwd = data.get("new_confirm_password")
        user = self.get_user_model_by_id(user_id)
        if not self.check_password(current_pwd, user):
            raise ThingahaCustomError("Current password is incorrect.")
        if new_pwd == new_confirm_pwd:
            return self.change_password_by_id(user_id, new_pwd)
        self.logger.error("Password and confirm password are different")
        raise ThingahaCustomError("Password and confirm password are different")
