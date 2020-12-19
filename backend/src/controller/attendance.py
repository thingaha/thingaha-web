"""API route for Attendance API"""
from flask import request, current_app, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required

from common.error import SQLCustomError, RequestDataEmpty, ValidateFail
from controller.api import api, post_request_empty, custom_error, full_admin, sub_admin
from service.attendance.attendance_service import AttendanceService

attendance_service = AttendanceService()


@api.route("/attendances", methods=["GET"])
@jwt_required
@cross_origin()
def get_attendances():
    try:
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 20, type=int)
        grade = request.args.get("grade")
        year = request.args.get("year")
        attendances = attendance_service.get_all_attendances(page, grade, year, per_page)
        current_app.logger.info("Get all attendance records")
        return jsonify({
            "data": attendances
        }), 200
    except SQLCustomError as error:
        current_app.logger.error("Error in get all attendance records")
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/attendances/<int:attendance_id>", methods=["GET"])
@jwt_required
@cross_origin()
def get_attendance_by_id(attendance_id: int):
    """
    get attendance by attendance id
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
        current_app.logger.info("Create school success. school_name %s", data.get("school_name"))
        return get_attendance_by_id(attendance_id), 200
    except (RequestDataEmpty, SQLCustomError, ValidateFail) as error:
        current_app.logger.error("Create attendance request fail")
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/attendances/<int:attendance_id>", methods=["DELETE"])
@jwt_required
@full_admin
@cross_origin()
def delete_attendances(attendance_id):
    """
    delete attendance  by ID
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
def update_attendance(attendance_id: int):
    """
    update attendance by ID
    :param attendance_id:
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()

    try:
        status = attendance_service.update_attendance_by_id(attendance_id, data)

        if status:
            current_app.logger.info("Success update attendance for attendance_id: %s", attendance_id)
            return get_attendance_by_id(attendance_id)
        else:
            current_app.logger.error("Fail update attendance for attendance_id: %s", attendance_id)
            return custom_error("Fail to update attendance id : %", attendance_id)
    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        current_app.logger.error("Update attendance fail: attendance_id: %s", attendance_id)
        return jsonify({"errors": [error.__dict__]}), 400
