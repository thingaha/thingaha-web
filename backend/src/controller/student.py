"""API route for Student API"""
from flask import request, current_app, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required

from common.error import SQLCustomError, RequestDataEmpty, ValidateFail
from controller.api import api, post_request_empty, address_service
from service.student.student_service import StudentService

student_service = StudentService()


@api.route("/students", methods=["GET"])
@jwt_required
@cross_origin()
def get_students():
    try:
        page = request.args.get("page", 1, type=int)
        student, count = student_service.get_all_students(page)
        current_app.logger.info("Get all student records")
        return jsonify({
            "data": {
                "count": count,
                "students": student
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("Error in get all student records")
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/students/<int:student_id>", methods=["GET"])
@jwt_required
@cross_origin()
def get_student_by_id(student_id: int):
    """
    get student by student id
    :return:
    """
    try:
        student = student_service.get_student_by_id(student_id)
        current_app.logger.info("Return data for student_id: {}".format(student_id))
        return jsonify({
            "data": {
                "count": len(student),
                "student": student
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("Return error for students: {}".format(student_id))
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/students", methods=["POST"])
@jwt_required
@cross_origin()
def create_student():
    """
    create student by post body
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
            "street_address": data.get("street_address"),
            "type": data.get("type")
        })
        student_id = student_service.create_student({
            "name": data.get("name"),
            "deactivated_at": data.get("deactivated_at"),
            "birth_date": data.get("birth_date"),
            "father_name": data.get("father_name"),
            "mother_name": data.get("mother_name"),
            "parents_occupation": data.get("parents_occupation"),
            "photo": data.get("photo"),
            "address_id": address_id})
        current_app.logger.info("Create student success. student_name %s", data.get("name"))
        return get_student_by_id(student_id), 200
    except (RequestDataEmpty, SQLCustomError, ValidateFail) as error:
        current_app.logger.error("Create student request fail")
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/students/<int:student_id>", methods=["DELETE"])
@jwt_required
@cross_origin()
def delete_students(student_id: int):
    """
    delete student  by ID
    :param student_id:
    :return:
    """
    try:
        current_app.logger.info("Delete student id: {}".format(student_id))
        student_delete_status = False
        student = student_service.get_student_by_id(student_id)

        if len(student) == 0:
            current_app.logger.error("No student id to delete: {}".format(student_id))
            return jsonify({"errors": ["No student id to delete"]}), 404

        if student_service.delete_student_by_id(student_id):
            student_delete_status = address_service.delete_address_by_id(student["address"]["id"])
        return jsonify({
            "status": student_delete_status
            }), 200
    except SQLCustomError as error:
        current_app.logger.error("Fail to delete student_id: %s".format(student_id))
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/students/<int:student_id>", methods=["PUT"])
@jwt_required
@cross_origin()
def update_student(student_id: int):
    """
    update student by ID
    :param student_id:
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()
    student_update_status = False
    try:
        address_id = int(data.get("address_id"))
        if address_service.update_address_by_id(address_id, {
            "division": data.get("division"),
            "district": data.get("district"),
            "township": data.get("township"),
            "street_address": data.get("street_address"),
            "type": data.get("type")
        }):
            student_update_status = student_service.update_student_by_id(student_id, {
                "name": data.get("name"),
                "deactivated_at": data.get("deactivated_at"),
                "birth_date": data.get("birth_date"),
                "father_name": data.get("father_name"),
                "mother_name": data.get("mother_name"),
                "parents_occupation": data.get("parents_occupation"),
                "photo": data.get("photo"),
                "address_id": address_id
            })
        current_app.logger.info("Update success for student_id: {}".format(student_id)) \
            if student_update_status else current_app.logger.error("Update fail for student_id: {}"
                                                                  .format(student_id))
        return jsonify({
            "status": student_update_status
        }), 200
    except ValueError as error:
        current_app.logger.error("Value error for address id. error: %s", error)
        return jsonify({"errors": [error.__dict__]}), 400
    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        current_app.logger.error("Error for student data update id {} Error: {}"
                                 .format(student_id, error))
        return jsonify({"errors": [error.__dict__]}), 400
