from flask import Blueprint, request, current_app, jsonify
from flask_cors import cross_origin

from common.error import SQLCustomError, RequestDataEmpty, ValidateFail
from service.address.address_service import AddressService
from service.school.school_service import SchoolService
from service.user.user_service import UserService

api = Blueprint("api", __name__, url_prefix="/api/v1")
user_service: UserService = None
school_service: SchoolService = None
address_service: AddressService = None


@api.route("/user", methods=["GET"])
@cross_origin()
def get_all_users():
    """
    get all users list
    """
    try:
        users = user_service.get_all_users()
        current_app.logger.info("get all users")
        return jsonify({
            "data": {
                "count": len(users),
                "users": users
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("fail to get all users: %s", error)
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400


@api.route("/user/<int:user_id>", methods=["GET"])
@cross_origin()
def get_user_by_id(user_id: int):
    """
    get user by id
    :return:
    """
    try:
        current_app.logger.info("get user_id: %s", user_id)
        return jsonify({
            "data": {
                "user": user_service.get_user_by_id(user_id)
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("fail to get user_id: %s", user_id)
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400


@api.route("/user", methods=["POST"])
@cross_origin()
def create_user():
    data = request.get_json()
    try:
        address_id = address_service.create_address({
            "division": data.get("division"),
            "district": data.get("district"),
            "township": data.get("township"),
            "street_address": data.get("street_address")
        })
        user_id = user_service.create_user({
            "name": data.get("name"),
            "email": data.get("email"),
            "address_id": address_id,
            "password": data.get("password"),
            "role": data.get("role"),
            "country": data.get("country")
        })
        current_app.logger.info("create user success. user_name %s", data.get("name"))
        return get_user_by_id(user_id)
    except (RequestDataEmpty, SQLCustomError, ValidateFail) as error:
        current_app.logger.error("create user fail. user_name %s, error: %s", data.get("name"), error)
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400


@api.route("/user/<int:user_id>", methods=["PUT"])
@cross_origin()
def update_user(user_id: int):
    """
    update user info by id
    """
    data = request.get_json()
    user_update_status = False
    try:
        address_id = int(data.get("address_id"))
        if address_service.update_address_by_id(address_id, {
            "division": data.get("division"),
            "district": data.get("district"),
            "township": data.get("township"),
            "street_address": data.get("street_address")
        }):
            user_update_status = user_service.update_user_by_id(user_id, {
                "name": data.get("name"),
                "email": data.get("email"),
                "address_id": address_id,
                "password": data.get("password"),
                "role": data.get("role"),
                "country": data.get("country")
            })
        current_app.logger.info("success user update for user_id: %s", user_id)
        return jsonify({
            "status": user_update_status
        }), 200
    except ValueError as error:
        current_app.logger.error("Value error for address id. error: %s", error)
        return jsonify({
            "errors": {
                "error": error
            }
        }), 400
    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        current_app.logger.error("fail to update user: %s, error: %s", user_id, error)
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400


@api.route("/user/<int:user_id>", methods=["DELETE"])
@cross_origin()
def delete_user(user_id: int):
    """
    delete user by id
    """
    try:
        current_app.logger.info("delete user : user_id: %s", user_id)
        return jsonify({
            "status": user_service.delete_user_by_id(user_id)
        }), 200
    except SQLCustomError as error:
        current_app.logger.error("fail to delete user : user_id: %s", user_id)
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400


@api.route("/address/<int:address_id>", methods=["GET"])
@cross_origin()
def get_address_by_id(address_id: int):
    """
    get address by id
    :param address_id:
    :return:
    """
    try:
        address = address_service.get_address_by_id(address_id)
        current_app.logger.info("Return data for address_id: {}".format(address_id))
        return jsonify({
            "data": {
                "schools": address
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("Return error for school_id: {}".format(address_id))
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400


@api.route("/address", methods=["POST"])
@cross_origin()
def create_address():
    """
    create address data
    :return:
    """
    data = request.get_json()
    try:
        current_app.logger.info("create address")
        address_id = address_service.create_address({
            "division": data.get("division"),
            "district": data.get("district"),
            "township": data.get("township"),
            "street_address": data.get("street_address")
        })
        current_app.logger.info("create address success. address %s", data.get("street_address"))
        return get_address_by_id(address_id)
    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400


@api.route("/address/<int:address_id>", methods=["PUT"])
@cross_origin()
def update_address(address_id: int):
    """
    update address data
    :param address_id:
    :return:
    """
    data = request.get_json()
    try:
        current_app.logger.info("update address for address_id: %s", address_id)
        return jsonify({
            "status": address_service.update_address_by_id(address_id, data)
        }), 200
    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        current_app.logger.error("update address fail: address_id: %s", address_id)
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400


@api.route("/school", methods=["GET"])
@cross_origin()
def get_school():
    """
    get school from school table
    :return:
    """
    try:
        schools = school_service.get_all_schools()
        current_app.logger.info("get all school records")
        return jsonify({
            "data": {
                "count": len(schools),
                "schools": schools
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("error in get all school records")
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400


@api.route("/school/<int:school_id>", methods=["GET"])
@cross_origin()
def get_school_by_id(school_id: int):
    """
    get school by school id
    :return:
    """
    try:
        schools = school_service.get_school_by_id(school_id)
        current_app.logger.info("Return data for school_id: {}".format(school_id))
        return jsonify({
            "data": {
                "count": len(schools),
                "schools": schools
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("Return error for school_id: {}".format(school_id))
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400


@api.route("/school", methods=["POST"])
@cross_origin()
def create_school():
    data = request.get_json()
    try:
        address_id = address_service.create_address({
            "division": data.get("division"),
            "district": data.get("district"),
            "township": data.get("township"),
            "street_address": data.get("street_address")
        })
        school_id = school_service.create_school({
            "school_name": data.get("school_name"),
            "contact_info": data.get("contact_info"),
            "address_id": address_id
        })
        current_app.logger.info("create school success. school_name %s", data.get("school_name"))
        return get_school_by_id(school_id)
    except (RequestDataEmpty, SQLCustomError, ValidateFail) as error:
        current_app.logger.error("create school request fail")
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400


@api.route("/school/<int:school_id>", methods=["DELETE"])
@cross_origin()
def delete_school(school_id):
    try:
        current_app.logger.info("delete school id: {}".format(school_id))
        return jsonify({
            "status": school_service.delete_school_by_id(school_id)
        }), 200
    except SQLCustomError as error:
        current_app.logger.error("fail to delete school_id: %s".format(school_id))
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400


@api.route("/school/<int:school_id>", methods=["PUT"])
@cross_origin()
def update_school(school_id: int):
    data = request.get_json()
    school_update_status = False
    try:
        address_id = int(data.get("address_id"))
        if address_service.update_address_by_id(address_id, {
            "division": data.get("division"),
            "district": data.get("district"),
            "township": data.get("township"),
            "street_address": data.get("street_address")
        }):
            school_update_status = school_service.update_school_by_id(school_id, {
                "school_name": data.get("school_name"),
                "contact_info": data.get("contact_info"),
                "address_id": address_id
            })
        current_app.logger.info("update success for school_id: {}".format(school_id)) if school_update_status else \
            current_app.logger.error("update fail for school_id: {}".format(school_id))
        return jsonify({
            "status": school_update_status
        }), 200
    except ValueError as error:
        current_app.logger.error("Value error for address id. error: %s", error)
        return jsonify({
            "errors": {
                "error": error
            }
        }), 400
    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        current_app.logger.error("Error for school data update id {} Error: {}".format(school_id, error))
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400
