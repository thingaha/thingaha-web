"""
main api route module for thingaha app
blueprint name: api
current version: v1
"""

from flask import Blueprint, current_app, jsonify
from flask_jwt_extended import JWTManager
from common.error import ThingahaCustomError, RequestDataEmpty

api = Blueprint("api", __name__, url_prefix="/api/v1")

jwt: JWTManager = None


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
from controller.transfer import *
