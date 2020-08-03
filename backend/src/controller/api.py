from flask import Blueprint, request, current_app

from models.address import AddressModel
from service.user.user_service import UserService

api = Blueprint("api", __name__, url_prefix="/api/v1")
user_service: UserService = None


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
