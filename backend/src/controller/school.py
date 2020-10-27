"""API route for School API"""
from flask import request, current_app, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required

from common.error import SQLCustomError, RequestDataEmpty, ValidateFail
from controller.api import api, post_request_empty, address_service
from service.school.school_service import SchoolService

school_service = SchoolService()


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
        current_app.logger.info("Get all school records")
        return jsonify({
            "data": {
                "count": len(schools),
                "schools": schools
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("Error in get all school records")
        return jsonify({"errors": [error.__dict__]}), 400


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
                "school": schools
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("Return error for school_id: {}".format(school_id))
        return jsonify({"errors": [error.__dict__]}), 400


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
            "street_address": data.get("street_address"),
            "type": data.get("type")
        })
        school_id = school_service.create_school({
            "school_name": data.get("school_name"),
            "contact_info": data.get("contact_info"),
            "address_id": address_id
        })
        current_app.logger.info("Create school success. school_name %s", data.get("school_name"))
        return get_school_by_id(school_id)
    except (RequestDataEmpty, SQLCustomError, ValidateFail) as error:
        current_app.logger.error("Create school request fail")
        return jsonify({"errors": [error.__dict__]}), 400


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
        current_app.logger.info("Delete school id: {}".format(school_id))
        return jsonify({
            "status": school_service.delete_school_by_id(school_id)
        }), 200
    except SQLCustomError as error:
        current_app.logger.error("Fail to delete school_id: %s".format(school_id))
        return jsonify({"errors": [error.__dict__]}), 400


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
            "street_address": data.get("street_address"),
            "type": data.get("type")
        }):
            school_update_status = school_service.update_school_by_id(school_id, {
                "school_name": data.get("school_name"),
                "contact_info": data.get("contact_info"),
                "address_id": address_id
            })
        current_app.logger.info("Update success for school_id: {}".format(school_id)) \
            if school_update_status else current_app.logger.error("Update fail for school_id: {}"
                                                                  .format(school_id))
        return jsonify({
            "status": school_update_status
        }), 200
    except ValueError as error:
        current_app.logger.error("Value error for address id. error: %s", error)
        return jsonify({"errors": [error.__dict__]}), 400
    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        current_app.logger.error("Error for school data update id {} Error: {}"
                                 .format(school_id, error))
        return jsonify({"errors": [error.__dict__]}), 400
