"""
main api route module for thingaha app
blueprint name: api
current version: v1
"""
from datetime import timedelta

from flask import Blueprint, request, current_app, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import JWTManager, jwt_required, create_access_token

from common.error import SQLCustomError, RequestDataEmpty, ValidateFail, ThingahaCustomError
from service.address.address_service import AddressService
from service.school.school_service import SchoolService
from service.user.user_service import UserService
from service.attendance.attendance_service import AttendanceService

api = Blueprint("api", __name__, url_prefix="/api/v1")
user_service: UserService = None
school_service: SchoolService = None
address_service: AddressService = None
attendance_service: AttendanceService = None
jwt: JWTManager = None


@api.route("/login", methods=["POST"])
def login():
    if not request.is_json:
        return custom_error("Missing JSON in request")
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if not email:
        return custom_error("Missing email parameter")
    if not password:
        return custom_error("Missing password parameter")
    user = user_service.get_user_by_email(email)
    if not user:
        return custom_error("Requested {} is not a registered member".format(email))
    if user_service.check_password(password, user):
        access_token = create_access_token(identity=email, expires_delta=timedelta(days=1))
        return jsonify(access_token=access_token), 200
    return custom_error("Bad username or password", 401)


@api.route("/users", methods=["GET"])
@jwt_required
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


@api.route("/users/<int:user_id>", methods=["GET"])
@jwt_required
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


@api.route("/users", methods=["POST"])
@jwt_required
@cross_origin()
def create_user():
    """
    create user by post body
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()
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
        current_app.logger.error("create user fail. user_name %s, error: %s",
                                 data.get("name"), error)
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400


@api.route("/users/<int:user_id>", methods=["PUT"])
@jwt_required
@cross_origin()
def update_user(user_id: int):
    """
    update user info by id
    """
    data = request.get_json()
    user_update_status = False
    if data is None:
        return post_request_empty()
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


@api.route("/users/<int:user_id>", methods=["DELETE"])
@jwt_required
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


@api.route("/addresses/<int:address_id>", methods=["GET"])
@jwt_required
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


@api.route("/addresses", methods=["POST"])
@jwt_required
@cross_origin()
def create_address():
    """
    create address data
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()
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


@api.route("/addresses/<int:address_id>", methods=["PUT"])
@jwt_required
@cross_origin()
def update_address(address_id: int):
    """
    update address data
    :param address_id:
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()
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


@api.route("/schools", methods=["GET"])
@jwt_required
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


@api.route("/schools/<int:school_id>", methods=["GET"])
@jwt_required
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


@api.route("/schools", methods=["POST"])
@jwt_required
@cross_origin()
def create_school():
    """
    create school by post body
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()
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


@api.route("/schools/<int:school_id>", methods=["DELETE"])
@jwt_required
@cross_origin()
def delete_school(school_id):
    """
    delete school by ID
    :param school_id:
    :return:
    """
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


@api.route("/schools/<int:school_id>", methods=["PUT"])
@jwt_required
@cross_origin()
def update_school(school_id: int):
    """
    update school by ID
    :param school_id:
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()
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
        current_app.logger.info("update success for school_id: {}".format(school_id)) \
            if school_update_status else current_app.logger.error("update fail for school_id: {}"
                                                                  .format(school_id))
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
        current_app.logger.error("Error for school data update id {} Error: {}"
                                 .format(school_id, error))
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400


@api.route("/attendances", methods=["GET"])
@jwt_required
@cross_origin()
def get_attendances():
    try:
        attendance = attendance_service.get_all_attendance_records()
        current_app.logger.info("get all attendance records")
        return jsonify({
            "data": {
                "count": len(attendance),
                "attendances": attendance
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("error in get all attendance records")
        return jsonify({"errors": {"error": error.__dict__}}), 400


@api.route("/attendances/<int:attendance_id>", methods=["GET"])
@jwt_required
@cross_origin()
def get_attendance_by_id(attendance_id: int):
    """
    get attendance by attendance id
    :return:
    """
    try:
        attendance = attendance_service.get_attendance_by_id(attendance_id)
        current_app.logger.info("Return data for attendance_id: {}".format(attendance_id))
        return jsonify({
            "data": {
                "count": len(attendance),
                "attendances": attendance
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("Return error for attendances: {}".format(attendance_id))
        return jsonify({"errors": {"error": error.__dict__}}), 400


@api.route("/attendances", methods=["POST"])
@jwt_required
@cross_origin()
def create_attendance():
    """
    create attendance by post body
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()
    try:
        attendance_id = attendance_service.create_attendance({
            "student_id": data.get("student_id"),
            "school_id": data.get("school_id"),
            "grade": data.get("grade"),
            "year": data.get("year"),
            "enrolled_date": data.get("enrolled_date")})
        current_app.logger.info("create school success. school_name %s", data.get("school_name"))
        return get_attendance_by_id(attendance_id), 200
    except (RequestDataEmpty, SQLCustomError, ValidateFail) as error:
        current_app.logger.error("create attendance request fail")
        return jsonify({"errors": {"error": error.__dict__}}), 400


@api.route("/attendances/<int:attendance_id>", methods=["DELETE"])
@jwt_required
@cross_origin()
def delete_attendances(attendance_id):
    """
    delete attendance  by ID
    :param attendance_id:
    :return:
    """
    try:
        current_app.logger.info("delete attendance id: {}".format(attendance_id))
        return jsonify({
            "status": attendance_service.delete_attendance_by_id(attendance_id)
        }), 200
    except SQLCustomError as error:
        current_app.logger.error("fail to delete attendance_id: %s".format(attendance_id))
        return jsonify({"errors": {"error": error.__dict__}}), 400


@api.route("/attendances/<int:attendance_id>", methods=["PUT"])
@jwt_required
@cross_origin()
def update_attendance(attendance_id: int):
    """
    update attendance by ID
    :param attendance_id:
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()
    data = request.get_json()
    if data is None:
        return post_request_empty()
    try:
        current_app.logger.info("update attendance for attendance_id: %s", attendance_id)
        return jsonify({
            "status": attendance_service.update_attendance_by_id(attendance_id, data)
        }), 200
    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        current_app.logger.error("update attendance fail: attendance_id: %s", attendance_id)
        return jsonify({"errors": {"error": error.__dict__}}), 400


def post_request_empty():
    """
    helper function for post request empty
    :return:
    """
    current_app.logger.error("Request Body required")
    return jsonify({
        "errors": {
            "error": RequestDataEmpty("Request Data is Empty").__dict__
        }
    }), 400


def custom_error(error_message: str, status_code: int = 400):
    """
    helper function for custom error with status code return return
    :param error_message:
    :param status_code:
    :return:
    """
    return jsonify({"errors": {"error": ThingahaCustomError(error_message).__dict__}}), status_code
