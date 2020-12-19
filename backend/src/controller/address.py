"""API route for address API"""
from flask import request, current_app, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required

from common.error import SQLCustomError, RequestDataEmpty, ValidateFail, ThingahaCustomError
from controller.api import api, post_request_empty, custom_error, full_admin, sub_admin
from service.address.address_service import AddressService

address_service = AddressService()


@api.route("/addresses/<int:address_id>", methods=["GET"])
@jwt_required
@cross_origin()
def get_address_by_id(address_id: int):
    """
    get address by id
    :param address_id:
    :return:
    """
    try:
        address = address_service.get_address_by_id(address_id)
        current_app.logger.info("Return data for address_id: {}".format(address_id))
        return jsonify({
            "data": {
                "address": address
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("Return error for address_id: {}".format(address_id))
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/addresses", methods=["POST"])
@jwt_required
@sub_admin
@cross_origin()
def create_address():
    """
    create address data
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()
    try:
        current_app.logger.info("Create address")
        address_id = address_service.create_address({
            "division": data.get("division"),
            "district": data.get("district"),
            "township": data.get("township"),
            "street_address": data.get("street_address"),
            "type": data.get("type")
        })
        current_app.logger.info("Create address success. address %s", data.get("street_address"))
        return get_address_by_id(address_id)
    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/addresses/<int:address_id>", methods=["PUT"])
@jwt_required
@sub_admin
@cross_origin()
def update_address(address_id: int):
    """
    update address data
    :param address_id:
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()
    try:
        status = address_service.update_address_by_id(address_id, data)
        if status:
            current_app.logger.info("Success update address for address_id: %s", address_id)
            return get_address_by_id(address_id)
        else:
            current_app.logger.error("Fail update address for address_id: %s", address_id)
            return custom_error("Fail update address for address_id: %s", address_id)
    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        current_app.logger.error("Update address fail: address_id: %s", address_id)
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/addresses/<int:address_id>", methods=["DELETE"])
@jwt_required
@full_admin
@cross_origin()
def delete_address(address_id: int):
    """
    delete address by id
    :param address_id:
    :return:
    """
    try:
        current_app.logger.info("Delete address : address_id: %s", address_id)
        return jsonify({
            "status": address_service.delete_address_by_id(address_id)
        }), 200
    except SQLCustomError as error:
        current_app.logger.error("Fail to delete address : address_id: %s", address_id)
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/addresses", methods=["GET"])
@jwt_required
@cross_origin()
def get_all_addresses():
    """
    get all addresses list
    :return:
    """
    try:
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 20, type=int)
        address_type = request.args.get("type", None, type=str)
        return jsonify({
            "data": address_service.get_all_addresses(page, per_page, address_type)
        }), 200
    except (SQLCustomError, ThingahaCustomError) as error:
        current_app.logger.error("Fail to get all addresses: %s", error.description)
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/addresses/search", methods=["GET"])
@jwt_required
@cross_origin()
def search_addresses():
    """
    search addresses by string [ search all in  division district township street_address ]
    """
    query = request.args.get("query")
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("page", 20, type=int)
    try:
        current_app.logger.info("search addresses : query: %s", query)
        return jsonify({
            "data": address_service.search_address_by_query(page, query, per_page)
        }), 200
    except SQLCustomError as error:
        current_app.logger.error("Fail to search addresses : query: %s", query)
        return jsonify({"errors": [error.__dict__]}), 400
