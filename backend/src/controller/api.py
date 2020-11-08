"""
main api route module for thingaha app
blueprint name: api
current version: v1
"""
import os

from flask import Blueprint
from flask_cors import cross_origin
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required

from common.error import ThingahaCustomError, FileNotFound

api = Blueprint("api", __name__, url_prefix="/api/v1")

jwt: JWTManager = None
division_file_path = None


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
