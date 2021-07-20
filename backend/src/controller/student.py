"""API route for Student API"""
from datetime import datetime

from flask import request, current_app, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required

from common.error import SQLCustomError, RequestDataEmpty, ValidateFail, ThingahaCustomError
from common.helper import ThingahaHelper
from controller.api import address_service
from controller.api import api, post_request_empty, custom_error, sub_admin, full_admin, get_default_address
from service.student.student_service import StudentService

student_service = StudentService()


def get_student_data_from_request(form_request):
    """
    get student data from request form and divide data
    @param form_request:
    @type form_request:
    @return:
    @rtype:
    """
    photo = None
    if form_request.mimetype == 'application/json':
        data = form_request.get_json()
    else:
        data = form_request.form
        photo = form_request.files.get('photo', None)
    return data, photo


@api.route("/students", methods=["GET"])
@jwt_required
@cross_origin()
def get_students():
    try:
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 20, type=int)
        current_app.logger.info("Get all student records")
        return jsonify({
            "data": student_service.get_all_students(page, per_page)
        }), 200
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
        current_app.logger.info("Return data for student_id: {}".format(student_id))
        return jsonify({
            "data": {
                "student": student_service.get_student_by_id(student_id)
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("Return error for students: {}".format(student_id))
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/students", methods=["POST"])
@jwt_required
@sub_admin
@cross_origin()
def create_student():
    """
    create student by post body
    :return:
    """
    data, photo = get_student_data_from_request(request)
    if data is None:
        return post_request_empty()
    try:
        address_data = ThingahaHelper.parse_address_data(data) if data.get('address[division]') else get_default_address()
        address_id = address_service.create_address({
            "division": address_data.get("division"),
            "district": address_data.get("district"),
            "township": address_data.get("township"),
            "street_address": address_data.get("street_address"),
            "type": "student"
        }, True)
        if not address_id:
            raise ThingahaCustomError("Student address create fail")

        student_id = student_service.create_student({
            "name": data.get("name"),
            "deactivated_at":  None if data.get("active") else datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "birth_date": data.get("birth_date"),
            "father_name": data.get("father_name"),
            "mother_name": data.get("mother_name"),
            "gender": data.get("gender"),
            "parents_occupation": data.get("parents_occupation"),
            "photo": photo,
            "address_id": address_id})
        current_app.logger.info("Create student success. student_name %s", data.get("name"))
        return get_student_by_id(student_id), 200
    except (RequestDataEmpty, SQLCustomError, ValidateFail, ThingahaCustomError) as error:
        current_app.logger.error("Create student request fail")
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/students/<int:student_id>", methods=["DELETE"])
@jwt_required
@full_admin
@cross_origin()
def delete_students(student_id: int):
    """
    delete student by ID
    :param student_id:
    :return:
    """
    try:
        current_app.logger.info("Delete student id: {}".format(student_id))
        student_delete_status = False
        student = student_service.get_student_by_id(student_id)
        if student_service.delete_student_by_id(student_id):
            if student.get("photo") and student_service.delete_file(student.get("photo")):
                current_app.logger.info("Student photo exists and delete the photo in s3")
            else:
                current_app.logger.warning("No photo or delete the photo in s3")
            student_delete_status = address_service.delete_address_by_id(student["address"]["id"])
        return jsonify({
            "status": student_delete_status
            }), 200
    except SQLCustomError as error:
        current_app.logger.error("Fail to delete student_id: %s".format(student_id))
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/students/<int:student_id>", methods=["PUT"])
@jwt_required
@sub_admin
@cross_origin()
def update_student(student_id: int):
    """
    update student by ID
    :param student_id:
    :return:
    """
    data, photo = get_student_data_from_request(request)
    if data is None:
        return post_request_empty()

    student = student_service.get_student_by_id(student_id)
    if not student:
        return custom_error("Invalid student id supplied.")

    try:
        address_data = ThingahaHelper.parse_address_data(data)
        address_updated = True

        if address_data:
            address_updated = address_service.update_address_by_id(student["address"]["id"], {
                "division": address_data.get("division"),
                "district": address_data.get("district"),
                "township": address_data.get("township"),
                "street_address": address_data.get("street_address"),
                "type": "student"
            })

        if address_updated:
            student_update_status = student_service.update_student_by_id(student_id, {
                "name": data.get("name"),
                "deactivated_at": None if data.get("active") else datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "birth_date": data.get("birth_date"),
                "father_name": data.get("father_name"),
                "mother_name": data.get("mother_name"),
                "gender": data.get("gender"),
                "parents_occupation": data.get("parents_occupation"),
                "photo": photo,
                "address_id": student["address"]["id"]
            })
            if student_update_status:
                current_app.logger.info("Update success for student_id: {}".format(student_id))
                return get_student_by_id(student_id)
            else:
                current_app.logger.error("Update fail for student_id: {}".format(student_id))
                custom_error("Update Fail for student id: {}".format(student_id))

    except ValueError as error:
        current_app.logger.error("Value error for address id. error: %s", error)
        return jsonify({"errors": [error.__dict__]}), 400

    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        current_app.logger.error("Error for student data update id {} Error: {}"
                                 .format(student_id, error))
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/students/<int:student_id>/photo", methods=["DELETE"])
@jwt_required
@sub_admin
@cross_origin()
def delete_student_photo(student_id: int):
    """
    delete student photo
    """
    if not student_id:
        current_app.logger.error("Empty url or empty student id")
        return post_request_empty()
    student = student_service.get_student_by_id(student_id)
    try:
        if not student:
            raise ThingahaCustomError("Invalid student id.")
        if student["photo"] is None:
            raise ThingahaCustomError("Cannot delete photo that doesn't exist anymore.")
        result = student_service.delete_file(student["photo"]) and student_service.update_photo_path_by_id(student_id, "")
        if result:
            current_app.logger.info("Delete file for URL %s success", student["photo"])
            return "", 200
        else:
            current_app.logger.error("Delete file for URL %s fail", student["photo"])
            return "", 400
    except TypeError:
        current_app.logger.error("Student id must be integer")
        return custom_error("Student id must be integer")
    except SQLCustomError as error:
        current_app.logger.error("Error for student photo delete {}".format(error.__dict__))
        return custom_error("Error updating student photo.")


@api.route("/students/search", methods=["GET"])
@jwt_required
@cross_origin()
def search_student():
    """
    search student with query
    search keyword in name, father_name, mother_name and parents_occupation
    """
    query = request.args.get("query")
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("page", 20, type=int)
    try:
        current_app.logger.info("search student : query: %s", query)
        return jsonify({
            "data": student_service.get_students_by_query(page, query, per_page)
        }), 200
    except SQLCustomError as error:
        current_app.logger.error("Fail to search student : query: %s", query)
        return jsonify({"errors": [error.__dict__]}), 400
