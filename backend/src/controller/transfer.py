"""API route for transfer API"""
from flask import request, current_app, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required

from common.error import SQLCustomError, RequestDataEmpty, ValidateFail
from controller.api import api, post_request_empty, custom_error, full_admin, sub_admin
from service.transfer.transfer_service import TransferService

transfer_service = TransferService()


@api.route("/transfers/<int:transfer_id>", methods=["GET"])
@jwt_required
@cross_origin()
def get_transfer_by_id(transfer_id: int):
    """
    get transfer by id
    :param transfer_id:
    :return:
    """
    try:
        transfers = transfer_service.get_transfer_by_id(transfer_id)
        current_app.logger.info("Return data for transfer_id: {}".format(transfer_id))
        return jsonify({
            "data": {
                "transfer": transfers
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("Return error for transfer_id: {}".format(transfer_id))
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/transfers", methods=["POST"])
@jwt_required
@sub_admin
@cross_origin()
def create_transfers():
    """
    create transfer data
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()
    try:
        current_app.logger.info("Create transfer record")
        transfer_id = transfer_service.create_transfer({
            "year": data.get("year"),
            "month": data.get("month"),
            "total_mmk": data.get("total_mmk"),
            "total_jpy": data.get("total_jpy")
        })
        current_app.logger.info("Create transfer success. transfer %s", data.get("month"))
        return get_transfer_by_id(transfer_id)
    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/transfers/<int:transfer_id>", methods=["PUT"])
@jwt_required
@sub_admin
@cross_origin()
def update_transfers(transfer_id: int):
    """
    update transfer data
    :param transfer_id:
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()
    try:
        status = transfer_service.update_transfer_by_id(transfer_id, data)
        if status:
            current_app.logger.info("Success update for transfer_id: %s", transfer_id)
            return get_transfer_by_id(transfer_id)
        else:
            current_app.logger.error("Fail update for transfer_id: %s", transfer_id)
            return custom_error("Update Fail for transfer_id: %s", transfer_id)
    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        current_app.logger.error("Update transfer fail: transfer_id: %s", transfer_id)
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/transfers/<int:transfer_id>", methods=["DELETE"])
@jwt_required
@full_admin
@cross_origin()
def delete_transfers(transfer_id: int):
    """
    delete transfer by id
    :param transfer_id:
    :return:
    """
    try:
        current_app.logger.info("Delete transfer : transfer_id: %s", transfer_id)
        return jsonify({
            "status": transfer_service.delete_transfer_by_id(transfer_id)
        }), 200
    except SQLCustomError as error:
        current_app.logger.error("Fail to delete transfer : transfer_id: %s", transfer_id)
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/transfers", methods=["GET"])
@jwt_required
@cross_origin()
def get_all_transfers():
    """
    get all transfers list
    :return:
    """
    try:
        page = request.args.get("page", 1, type=int)
        transfers, count = transfer_service.get_all_transfers(page)
        current_app.logger.info("Get all transfers")
        return jsonify({
            "data": {
                "count": count,
                "transfers": transfers
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("Fail to get all transfers: %s", error)
        return jsonify({"errors": [error.__dict__]}), 400
