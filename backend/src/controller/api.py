"""
main api route module for thingaha app
blueprint name: api
current version: v1
"""
import os
from datetime import timedelta
from functools import wraps

from flask import Blueprint, json
from flask_cors import cross_origin
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_claims
)

from common.error import ThingahaCustomError, FileNotFound


api = Blueprint("api", __name__, url_prefix="/api/v1")

jwt: JWTManager = None
division_file_path = None


@api.route("/login", methods=["POST"])
def login():
    if not request.is_json:
        return custom_error("Missing JSON in request")
    email = request.json.get("email", None)
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if email is None and username is None:
        return custom_error("One of email or username required")
    if not password:
        return custom_error("Missing password parameter")
    user = user_service.get_user_by_email(email) if email else user_service.get_user_by_username(username)
    if not user:
        return custom_error("Requested {} is not a registered member".format(email if email else username))
    if user_service.check_password(password, user):
        access_token = create_access_token(
            identity=user, expires_delta=timedelta(days=1))
        return jsonify({
            "data": {
                "access_token": access_token,
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "username": user.username
                }
            }
        }
        ), 200
    return custom_error("Bad username or password", 401)


def full_admin(func):
    """
    admin role checking
    """
    wraps(func)

    def decorated(*args, **kwargs):
        if get_jwt_claims() == "admin":
            return func(*args, **kwargs)
        else:
            return custom_error("Invalid user role supplied.", 403)

    decorated.__name__ = func.__name__
    return decorated


def sub_admin(func):
    """
    admin role checking for sub admin or full admin
    """
    wraps(func)

    def decorated(*args, **kwargs):
        if get_jwt_claims() in ["admin", "sub_admin"]:
            return func(*args, **kwargs)
        else:
            return custom_error("Invalid user role to apply this action.", 403)

    decorated.__name__ = func.__name__
    return decorated


@api.route("/myanmar_divisions", methods=["GET"])
@jwt_required
@cross_origin()
def get_mm_divisions():
    """
    get all divisions list
    :return:
    """
    try:
        path = os.path.dirname(__file__) + division_file_path
        with open(path) as d:
            mm_divisions = json.load(d)
        return jsonify({
            "data": {
                "divisions": mm_divisions
            }}), 200
    except FileNotFoundError:
        current_app.logger.info("Divison json file not found:{}".format(division_file_path))
        return jsonify({"errors": [FileNotFound("Division file not found").__dict__]}), 404


def post_request_empty():
    """
    helper function for post request empty
    :return:
    """
    current_app.logger.error("Request Body required")
    return jsonify({"errors": [RequestDataEmpty("Request Data is Empty").__dict__]}), 400


def custom_error(error_message: str, status_code: int = 400):
    """
    helper function for custom error with status code return return
    :param error_message:
    :param status_code:
    :return:
    """
    return jsonify({"errors": [ThingahaCustomError(error_message).__dict__]}), status_code


from controller.address import *
from controller.attendance import *
from controller.school import *
from controller.user import *
from controller.donation import *
from controller.transfer import *
from controller.student import *
from controller.extrafund import *
