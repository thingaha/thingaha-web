from flask import Blueprint, request, current_app, jsonify

from common.error import SQLCustomError, RequestDataEmpty, ValidateFail
from models.address import AddressModel
from service.address.address_service import AddressService
from service.school.school_service import SchoolService
from service.user.user_service import UserService

api = Blueprint("api", __name__, url_prefix="/api/v1")
user_service: UserService = None
school_service: SchoolService = None
address_service: AddressService = None


@api.route("/user", methods=["POST", "GET", "DELETE", "PUT"])
def create_user():
    """
    User management for User CRUD
    """
    # TODO call get users by id , name, email (confirm)
    if request.method == "GET":
        users = user_service.get_all_users()
        return {"count": len(users), "users": users}, 200
    data = request.get_json()
    if not request.is_json:
        current_app.logger.error("request body error")
        return {"error": "The request payload is not in JSON format"}, 400
    if request.method == "POST":
        if user_service.create_user(data):
            current_app.logger.info("create user success. email %s", data.get("email"))
            return {"message": f"user {data.get('email')} has been created successfully."}, 200
        current_app.logger.error("create user fail. email %s", data.get("email"))
        return {"message": f"user create fail."}, 400
    if request.method == "PUT":
        if user_service.update_user(data):
            current_app.logger.info("update user id %s success", data.get("id"))
            return {"message": f"user {data.get('email')} has been updated successfully."}, 200
        current_app.logger.error("update user id %s fail", data.get("id"))
        return {"message": f"user update fail."}, 400
    if request.method == "DELETE":
        if user_service.delete_user(data.get("id")):
            current_app.logger.info("delete user id %s success", data.get("id"))
            return {"message": f"user {data.get('id')} has been deleted successfully."}, 200
        current_app.logger.error("delete user id %s fail", data.get("id"))
        return {"message": f"user delete fail."}, 400
    return {"message": f"invalid operation."}, 400


@api.route("/address", methods=["POST", "GET"])
def create_address():
    if request.method == "POST":
        if request.is_json:
            data = request.get_json()
            if AddressModel.create_address(AddressModel(division=data["division"],
                                                        district=data["district"],
                                                        township=data["township"],
                                                        street_address=data["street_address"])):
                return {"message": f"user {data.get('street_address')} has been created successfully."}, 200
            else:
                current_app.logger.error("create address fail")
                return {"message": f"address create fail."}, 400
        else:
            current_app.logger.error("request body error")
            return {"error": "The request payload is not in JSON format"}, 400

    elif request.method == "GET":
        addresses = AddressModel.query.all()
        results = [
            {
                "division": address.division,
                "district": address.district,
                "township": address.township,
                "street_address": address.street_address
            } for address in addresses]
        return {"count": len(results), "addresses": results}, 200


@api.route("/school", methods=["GET"])
def get_school():
    """
    get school from school table
    :return:
    """
    try:
        schools = school_service.get_all_schools()
        return jsonify({
            "data": {
                "count": len(schools),
                "schools": schools
            }}), 200
    except SQLCustomError as e:
        return jsonify({
            "errors": {
                "error": e.__dict__
            }
        }), 400


@api.route("/school/<int:school_id>", methods=["GET"])
def get_school_by_id(school_id):
    """
    get school by school id
    :return:
    """
    try:
        schools = school_service.get_school_by_id(school_id)
        return jsonify({
            "data": {
                "count": len(schools),
                "schools": schools
            }}), 200
    except SQLCustomError as e:
        return jsonify({
            "errors": {
                "error": e.__dict__
            }
        }), 400


@api.route("/school", methods=["POST"])
def create_school():
    data = request.get_json()
    try:
        address_id = address_service.create_address({
            "division": data.get("division"),
            "district": data.get("district"),
            "township": data.get("township"),
            "street_address": data.get("street_address")
        })
        school_id = school_service.create_school({
            "school_name": data.get("school_name"),
            "contact_info": data.get("contact_info"),
            "address_id": address_id
        })
        current_app.logger.info("create school success. school_name %s", data.get("school_name"))
        return get_school_by_id(school_id)
    except (RequestDataEmpty, SQLCustomError, ValidateFail) as e:
        return jsonify({
            "errors": {
                "error": e.__dict__
            }
        }), 400


@api.route("/school/<int:school_id>", methods=["DELETE"])
def delete_school(school_id):
    try:

        return jsonify({
            "status": school_service.delete_school_by_id(school_id)
        }), 200
    except SQLCustomError as e:
        return jsonify({
            "errors": {
                "error": e.__dict__
            }
        }), 400


@api.route("/school/<int:school_id>", methods=["PUT"])
def update_school(school_id):
    data = request.get_json()
    try:
        return jsonify({
            "status": school_service.update_school_by_id(school_id, data)
        }), 200
    except (SQLCustomError, ValidateFail, RequestDataEmpty) as e:
        print(e)
        return jsonify({
            "errors": {
                "error": e.__dict__
            }
        }), 400
