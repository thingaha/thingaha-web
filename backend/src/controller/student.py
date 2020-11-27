"""API route for Student API"""
from typing import Optional

from botocore.exceptions import ClientError
from flask import request, current_app, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required

from common.aws_client import get_client, get_s3_url, get_bucket
from common.config import S3_BUCKET
from common.error import SQLCustomError, RequestDataEmpty, ValidateFail
from controller.api import address_service
from controller.api import api, post_request_empty, custom_error, sub_admin, full_admin
from service.student.student_service import StudentService

student_service = StudentService()
ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg"]


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
    data = request.get_json()
    if data is None:
        return post_request_empty()
    try:
        address_id = address_service.create_address({
            "division": data.get("division"),
            "district": data.get("district"),
            "township": data.get("township"),
            "street_address": data.get("street_address"),
            "type": "student"
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
@full_admin
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
@sub_admin
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

    student = student_service.get_student_by_id(student_id)
    if not student:
        return custom_error("Invalid student id supplied.")

    try:
        updated = address_service.update_address_by_id(student["address"]["id"], {
            "division": data.get("division"),
            "district": data.get("district"),
            "township": data.get("township"),
            "street_address": data.get("street_address"),
            "type": "student"
        })

        if updated:
            student_update_status = student_service.update_student_by_id(student_id, {
                "name": data.get("name"),
                "deactivated_at": data.get("deactivated_at"),
                "birth_date": data.get("birth_date"),
                "father_name": data.get("father_name"),
                "mother_name": data.get("mother_name"),
                "parents_occupation": data.get("parents_occupation"),
                "photo": data.get("photo"),
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


def allowed_file(filename: str) -> Optional[str]:
    """
    check file name extension
    :params: filename : str
    return: True or False
    """
    file_extension = filename.rsplit(".", 1)[1].lower()
    if "." in filename and file_extension in ALLOWED_EXTENSIONS:
        return file_extension
    return None


def delete_file(url: str) -> bool:
    """
    delete image file
    :params: url : str
    return: True or False
    """
    key = url.split("/")[-1]
    try:
        my_bucket = get_bucket()
        my_bucket.Object(key).delete()
        return True
    except ClientError as error:
        current_app.logger.error("File delete error %s", error)
        return False


def upload_file(img, file_name: str) -> bool:
    """
    upload file to S3
    :params img : image object
    :file_name : file name str
    return: True or False
    """
    s3_client = get_client()
    try:
        s3_client.upload_fileobj(img, S3_BUCKET, file_name, ExtraArgs={"ACL": "public-read"})
        return True
    except ClientError as error:
        current_app.logger.error("File upload error %s", error)
        return False


@api.route("/student/upload", methods=["POST"])
@jwt_required
@sub_admin
@cross_origin()
def upload_s3_file():
    """
    Upload a file to an S3 bucket
    :return: True if file was uploaded, else False
    """
    img = request.files["img"]
    student_id = request.form.get("student_id")
    if student_id is None or img is None or img.filename == "":
        return post_request_empty()
    file_extension = allowed_file(img.filename)
    if not file_extension:
        return custom_error("File extension should be .png or .jpg or .jpeg")
    file_name = student_id + "." + file_extension
    result = upload_file(img, file_name)
    if result:
        return jsonify(
            {"url": get_s3_url().format(S3_BUCKET, file_name)}
        ), 200
    else:
        return "", 400


@api.route("/student/upload", methods=["PUT"])
@jwt_required
@sub_admin
@cross_origin()
def update_file():
    """
    update s3 file, delete file first and upload new files
    """
    old_url = request.form["old_url"]
    if not old_url:
        current_app.logger.error("Old url for student required")
        return post_request_empty()
    if not delete_file(old_url):
        current_app.logger.error("Can't delete file before update")
        return custom_error("Update file error")
    return upload_s3_file()


@api.route("/student/delete", methods=["DELETE"])
@jwt_required
@sub_admin
@cross_origin()
def delete_s3_file():
    """
    delete S3 file
    """
    data = request.get_json()
    url = data.get("url")
    if not url:
        current_app.logger.error("Empty url")
        return post_request_empty()
    result = delete_file(url)
    if result:
        current_app.logger.info("Delete file for URL %s success", url)
        return "", 200
    else:
        current_app.logger.error("Delete file for URL %s fail", url)
        return "", 400
