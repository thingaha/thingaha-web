"""API route for Attendance API"""
from functools import wraps

from flask import request, current_app, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required

from common.error import SQLCustomError, RequestDataEmpty, ValidateFail
from controller.api import api, post_request_empty, custom_error, full_admin, sub_admin
from service.attendance.attendance_service import AttendanceService


def with_attendance_service(func):
    """
    Decorator function to set attendance service instance on each route that needs it.
    """
    wraps(func)

    def decorated(*args, **kwargs):
        attendance_service = AttendanceService(logger=current_app.logger)
        return func(attendance_service, *args, **kwargs)

    decorated.__name__ = func.__name__
    return decorated


@api.route("/attendances", methods=["GET"])
@jwt_required
@cross_origin()
@with_attendance_service
def get_attendances(attendance_service: AttendanceService):
    """
    get all attendances
    :param attendance_service:
    :return:
    :rtype:
    """
    try:
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 20, type=int)
        grade = request.args.get("grade", type=str)
        year = request.args.get("year", type=int)
        keyword = request.args.get("keyword", type=str)

        attendances = attendance_service.get_all_attendances(grade=grade, year=year, keyword=keyword, page=page, per_page=per_page)

        return jsonify({
            "data": attendances
        }), 200
    except SQLCustomError as error:
        current_app.logger.error("Error in get all attendance records")
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/attendances/<int:attendance_id>", methods=["GET"])
@jwt_required
@cross_origin()
@with_attendance_service
def get_attendance_by_id(attendance_service: AttendanceService, attendance_id: int):
    """
    get attendance by attendance id
    :param attendance_service:
    :param attendance_id:
    :return:
    """
    try:
        current_app.logger.info("Return data for attendance_id: {}".format(attendance_id))
        return jsonify({
            "data": {
                "attendance": attendance_service.get_attendance_by_id(attendance_id)
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("Return error for attendances: {}".format(attendance_id))
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/attendances", methods=["POST"])
@jwt_required
@sub_admin
@cross_origin()
@with_attendance_service
def create_attendance(attendance_service: AttendanceService):
    """
    create attendance by post body
    :param attendance_service:
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()
    try:
        attendance_id = attendance_service.create_attendance({
            "student_id": int(data.get("student_id")),
            "school_id": int(data.get("school_id")),
            "grade": data.get("grade"),
            "year": int(data.get("year")),
            "enrolled_date": attendance_service.thingaha_helper.standardize_str_to_date(data.get("enrolled_date"))})
        current_app.logger.info("Create school success. school_name %s", data.get("school_name"))
        return get_attendance_by_id(attendance_id), 200
    except (RequestDataEmpty, SQLCustomError, ValidateFail, ValueError) as error:
        current_app.logger.error(f"Create attendance request fail. {error}")
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/attendances/<int:attendance_id>", methods=["DELETE"])
@jwt_required
@full_admin
@cross_origin()
@with_attendance_service
def delete_attendances(attendance_service: AttendanceService, attendance_id: int):
    """
    delete attendance  by ID
    :param attendance_service:
    :param attendance_id:
    :return:
    """
    try:
        current_app.logger.info("Delete attendance id: {}".format(attendance_id))
        return jsonify({
            "status": attendance_service.delete_attendance_by_id(attendance_id)
        }), 200
    except SQLCustomError as error:
        current_app.logger.error("Fail to delete attendance_id: %s".format(attendance_id))
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/attendances/<int:attendance_id>", methods=["PUT"])
@jwt_required
@sub_admin
@cross_origin()
@with_attendance_service
def update_attendance(attendance_service: AttendanceService, attendance_id: int):
    """
    update attendance by ID
    :param attendance_id:
    :param attendance_service:
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()

    try:
        status = attendance_service.update_attendance_by_id(attendance_id, {
            "student_id": int(data.get("student_id")),
            "school_id": int(data.get("school_id")),
            "grade": data.get("grade"),
            "year": int(data.get("year")),
            "enrolled_date": attendance_service.thingaha_helper.standardize_str_to_date(data.get("enrolled_date"))})

        if status:
            current_app.logger.info("Success update attendance for attendance_id: %s", attendance_id)
            return get_attendance_by_id(attendance_id)
        else:
            current_app.logger.error("Fail update attendance for attendance_id: %s", attendance_id)
            return custom_error("Fail to update attendance id : %", attendance_id)
    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        current_app.logger.error("Update attendance fail: attendance_id: %s", attendance_id)
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/attendances/year", methods=["GET"])
@jwt_required
@cross_origin()
@with_attendance_service
def get_all_attendance_years(attendance_service: AttendanceService):
    """
    get all attendance years
    :param attendance_service:
    :return:
    """
    try:
        return jsonify({
            "data": attendance_service.get_all_attendance_years()
        }), 200
    except SQLCustomError as error:
        current_app.logger.error("Get all attendance query error: {}".format(error))
        return jsonify({"errors": [error.__dict__]}), 400
