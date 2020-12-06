"""API route for School API"""
from flask import request, current_app, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required

from common.error import SQLCustomError, RequestDataEmpty, ValidateFail
from controller.api import api, post_request_empty, address_service, custom_error, full_admin, sub_admin
from service.school.school_service import SchoolService

school_service = SchoolService()


@api.route("/schools", methods=["GET"])
@jwt_required
@cross_origin()
def get_school():
    """
    get all school from school table
    :return:
    """
    try:
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 20, type=int)
        current_app.logger.info("Get all school records.")
        return jsonify({
                "data": school_service.get_all_schools(page, per_page)
            }), 200
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
        current_app.logger.info(
            "Return data for school_id: {}".format(school_id))
        return jsonify({
            "data": {
                "school": schools
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error(
            "Return error for school_id: {}".format(school_id))
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/schools", methods=["POST"])
@jwt_required
@sub_admin
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
            "type": "school"
        })
        current_app.logger.debug("create address id: %s", address_id)
        school_id = school_service.create_school({
            "name": data.get("name"),
            "contact_info": data.get("contact_info"),
            "address_id": address_id
        })
        current_app.logger.info(
            "Create school success. name %s", data.get("name"))
        return get_school_by_id(school_id)
    except (RequestDataEmpty, SQLCustomError, ValidateFail) as error:
        current_app.logger.error("Create school request fail")
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/schools/<int:school_id>", methods=["DELETE"])
@jwt_required
@full_admin
@cross_origin()
def delete_school(school_id):
    """
    delete school by ID
    :param school_id:
    :return:
    """
    try:
        current_app.logger.info("Delete school id: {}".format(school_id))
        school_delete_status = False
        school = school_service.get_school_by_id(school_id)

        if len(school) == 0:
            current_app.logger.error(
                "No school id to delete: {}".format(school_id))
            return jsonify({"errors": ["No school id to delete"]}), 404

        if school_service.delete_school_by_id(school_id):
            school_delete_status = address_service.delete_address_by_id(
                school["address"]["id"])
        return jsonify({
            "status": school_delete_status
        }), 200
    except SQLCustomError as error:
        current_app.logger.error(
            "Fail to delete school_id: {}".format(school_id))
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/schools/<int:school_id>", methods=["PUT"])
@jwt_required
@sub_admin
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
    try:
        school = school_service.get_school_by_id(school_id)
        if not school:
            return custom_error("Invalid school id supplied.")

        updated = address_service.update_address_by_id(school["address"]["id"], {
            "division": data.get("division"),
            "district": data.get("district"),
            "township": data.get("township"),
            "street_address": data.get("street_address"),
            "type": "school"
        })

        if updated:
            school_update_status = school_service.update_school_by_id(school_id, {
                "name": data.get("name"),
                "contact_info": data.get("contact_info"),
                "address_id": school["address"]["id"]
            })
        else:
            return custom_error("Failed to update address.")
        if school_update_status:
            current_app.logger.info("Update success for school_id: {}:".format(school_id))
            return get_school_by_id(school_id)
        else:
            current_app.logger.error("Update fail for school_id: {}".format(school_id))
            return custom_error("Fail to update school id: {}".format(school_id))

    except ValueError as error:
        current_app.logger.error(
            "Value error for address id. error: %s", error)
        return jsonify({"errors": [error.__dict__]}), 400

    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        current_app.logger.error("Error for school data update id {} Error: {}"
                                 .format(school_id, error))
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/schools/search", methods=["GET"])
@jwt_required
@cross_origin()
def search_school():
    """
    search school by school name and contact info
    """
    query = request.args.get("query")
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 20, type=int)
    try:
        current_app.logger.info("search school : query: %s", query)
        return jsonify({
            "data": school_service.get_schools_by_query(page, query, per_page)
        }), 200
    except SQLCustomError as error:
        current_app.logger.error("Fail to search school : query: %s", query)
        return jsonify({"errors": [error.__dict__]}), 400
