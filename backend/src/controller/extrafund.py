"""API route for extrafunds API"""
from flask import request, current_app, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required

from common.error import SQLCustomError, RequestDataEmpty, ValidateFail
from controller.api import api, post_request_empty, custom_error, full_admin, sub_admin
from service.extrafund.extrafunds_service import ExtraFundsService
from service.transfer.transfer_service import TransferService

extra_funds_service = ExtraFundsService()
transfer_service = TransferService()


@api.route("/extra_funds/<int:extra_fund_id>", methods=["GET"])
@jwt_required
@cross_origin()
def get_extra_funds_by_id(extra_fund_id: int):
    """
    get extra_funds by id
    :param extra_fund_id:
    :return:
    """
    try:
        extra_funds = extra_funds_service.get_extra_fund_by_id(extra_fund_id)
        current_app.logger.info("Return data for extra_funds_id: {}".format(extra_fund_id))
        return jsonify({
            "data": {
                "extra_funds": extra_funds
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("Return error for extra_funds_id: {}".format(extra_fund_id))
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/extra_funds", methods=["POST"])
@jwt_required
@sub_admin
@cross_origin()
def create_extra_funds():
    """
     create extra_fund data
     :return:
     """
    data = request.get_json()
    if data is None:
        return post_request_empty()
    try:
        current_app.logger.info("Create extra_funds Record")
        extra_fund_id = extra_funds_service.create_extra_fund({
            "mmk_amount": data.get("mmk_amount"),
            "transfer_id": data.get("transfer_id")
        })
        current_app.logger.info("Create extra_funds success. extra_funds %s", data.get("extra_fund_id"))
        return get_extra_funds_by_id(extra_fund_id)
    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/extra_funds/<int:extra_fund_id>", methods=["PUT"])
@jwt_required
@sub_admin
@cross_origin()
def update_extra_funds(extra_fund_id: int):
    """
    update extra_funds data
    :param extra_fund_id:
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()
    try:
        status = extra_funds_service.update_extra_fund_by_id(extra_fund_id, data)
        if status:
            current_app.logger.info("Success update extra_funds for extra_funds_id: %s", extra_fund_id)
            return get_extra_funds_by_id(extra_fund_id)
        else:
            current_app.logger.error("Fail update extra_funds for extra_funds_id: %s", extra_fund_id)
            return custom_error("Fail to update extra fund id: {}".format(extra_fund_id))

    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        current_app.logger.error("Update extra_funds fail: extra_funds_id: %s", extra_fund_id)
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/extra_funds/<int:extra_fund_id>", methods=["DELETE"])
@jwt_required
@full_admin
@cross_origin()
def delete_extra_funds(extra_fund_id: int):
    """
    delete extra_funds by id
    :param extra_fund_id:
    :return:
    """
    try:
        current_app.logger.info("Delete extra_funds : extra_fund_id: %s", extra_fund_id)
        return jsonify({
            "status": extra_funds_service.delete_extra_fund_by_id(extra_fund_id)
        }), 200
    except SQLCustomError as error:
        current_app.logger.error("Fail to delete extra_funds : extra_funds_id: %s", extra_fund_id)
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/extra_funds", methods=["GET"])
@jwt_required
@cross_origin()
def get_all_extra_funds():
    """
    get all extra_funds list
    :return:
    """
    try:
        page = request.args.get("page", 1, type=int)
        extra_funds, total = extra_funds_service.get_all_extra_funds(page)
        new_transfers = extra_funds_service.get_new_transfers()
        current_app.logger.info("Get all extra_funds amount")
        return jsonify({
            "data": {
                "count": total,
                "extra_funds": extra_funds,
                "new_transfers": new_transfers
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("Fail to get all extra_funds: %s", error)
        return jsonify({"errors": [error.__dict__]}), 400
