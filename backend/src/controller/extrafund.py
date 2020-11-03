"""API route for extrafunds API"""
from flask import request, current_app, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required

from common.error import SQLCustomError, RequestDataEmpty, ValidateFail
from controller.api import api, post_request_empty
from service.extrafund.extrafunds_service import ExtrafundsService

extrafunds_service = ExtrafundsService()


@api.route("/extrafunds/<int:extrafund_id>", methods=["GET"])
@jwt_required
@cross_origin()
def get_extrafunds_by_id(extrafund_id: int):
    """
    get extrafunds by id
    :param extrafund_id:
    :return:
    """
    try:
        extrafunds = extrafunds_service.get_extrafund_by_id(extrafund_id)
        current_app.logger.info("Return data for extrafunds_id: {}".format(extrafund_id))
        return jsonify({
            "data": {
                "extrafunds": extrafunds
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("Return error for extrafunds_id: {}".format(extrafund_id))
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400


@api.route("/extrafunds", methods=["POST"])
@jwt_required
@cross_origin()
def create_extrafunds():
    """
     create extrafunds data
     :return:
     """
    data = request.get_json()
    if data is None:
        return post_request_empty()
    try:
        current_app.logger.info("Create extrafunds Record")
        extrafund_id = extrafunds_service.create_extrafund({
            "mmk_amount": data.get("mmk_amount"),
            "transfer_id": data.get("transfer_id")
        })
        current_app.logger.info("create extrafunds success. extrafunds %s", data.get("extrafund_id"))
        return get_extrafunds_by_id(extrafund_id)
    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400


@api.route("/extrafunds/<int:extrafund_id>", methods=["PUT"])
@jwt_required
@cross_origin()
def update_extrafunds(extrafund_id: int):
    """
    update extrafunds data
    :param extrafund_id:
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()
    try:
        current_app.logger.info("update extrafunds for extrafunds_id: %s", extrafund_id)
        return jsonify({
            "status": extrafunds_service.update_extrafund_by_id(extrafund_id, data)
        }), 200
    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        current_app.logger.error("update extrafunds fail: extrafunds_id: %s", extrafund_id)
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400


@api.route("/extrafunds/<int:extrafund_id>", methods=["DELETE"])
@jwt_required
@cross_origin()
def delete_extrafunds(extrafund_id: int):
    """
    delete extrafunds by id
    :param extrafund_id:
    :return:
    """
    try:
        current_app.logger.info("delete extrafunds : extrafund_id: %s", extrafund_id)
        return jsonify({
            "status": extrafunds_service.delete_extrafund_by_id(extrafund_id)
        }), 200
    except SQLCustomError as error:
        current_app.logger.error("fail to delete extrafunds : extrafunds_id: %s", extrafund_id)
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400


@api.route("/extrafunds", methods=["GET"])
@jwt_required
@cross_origin()
def get_all_extrafunds():
    """
    get all extrafunds list
    :return:
    """
    try:
        current_app.logger.info("Extrafunds Process Start")
        extrafunds = extrafunds_service.get_all_extrafunds()
        current_app.logger.info("get all extrafunds Amount")
        return jsonify({
            "data": {
                "count": len(extrafunds),
                "extrafunds": extrafunds
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("Fail to get all extrafunds: %s", error)
        return jsonify({
            "errors": {
                "error": error.__dict__
            }
        }), 400
