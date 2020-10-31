from flask import request, current_app, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required

from common.error import SQLCustomError, RequestDataEmpty, ValidateFail
from controller.api import api, post_request_empty
from service.donation.donation_service import DonationService

donation_service = DonationService()

@api.route("/donations", methods=["GET"])
# @jwt_required
# @cross_origin()
def get_donations():
    try:
        donations = donation_service.get_all_donations_records()
        current_app.logger.info("get all donation records")
        return jsonify({
            "data": {
                "count": len(donations),
                "attendances": donations
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("error in get all donation records")
        return jsonify({"errors": {"error": error.__dict__}}), 400


@api.route("/donations/<int:donation_id>", methods=["GET"])
# @jwt_required
# @cross_origin()
def get_donation_by_id(donation_id: int):
    """
    get donation by donation id
    :return:
    """
    try:
        donation = donation_service.get_donation_by_id(donation_id)
        current_app.logger.info("Return data for donation_id: {}".format(donation))
        return jsonify({
            "data": {
                "count": len(donation),
                "donations": donation
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("Return error for donations: {}".format(donation_id))
        return jsonify({"errors": {"error": error.__dict__}}), 400


@api.route("/donations", methods=["POST"])
# @jwt_required
# @cross_origin()
def create_donation():
    """
    create donation by post body
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()
    try:
        donation_id = donation_service.create_donation({
            "user_id": data.get("user_id"),
            "attendance_id": data.get("attendance_id"),
            "transfer_id": data.get("transfer_id"),
            "month": data.get("month"),
            "year": data.get("year"),
            "mmk_amount": data.get("mmk_amount"),
            "jpy_amount": data.get("jpy_amount"),
            "paid_at": data.get("paid_at")})
        current_app.logger.info("create donation success. donation%s", data.get("user_id"))
        return get_donation_by_id(donation_id)
    except (RequestDataEmpty, SQLCustomError, ValidateFail) as error:
        current_app.logger.error("create donation request fail")
        return jsonify({"errors": {"error": error.__dict__}}), 400


@api.route("/donations/<int:donation_id>", methods=["DELETE"])
# @jwt_required
# @cross_origin()
def delete_donation(donation_id):
    """
    delete donation  by ID
    :param donation_id:
    :return:
    """
    try:
        current_app.logger.info("delete donation id: {}".format(donation_id))
        return jsonify({
            "status": donation_service.delete_donation_by_id(donation_id)
        }), 200
    except SQLCustomError as error:
        current_app.logger.error("fail to delete donation_id: %s".format(donation_id))
        return jsonify({"errors": {"error": error.__dict__}}), 400

@api.route("/donations/<int:donation_id>", methods=["PUT"])
# @jwt_required
# @cross_origin()
def update_donation(donation_id: int):
    """
    update donation by ID
    :param donation_id:
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()
    data = request.get_json()
    if data is None:
        return post_request_empty()
    try:
        current_app.logger.info("update donation for donation_id: %s", donation_id)
        return jsonify({
            "status": donation_service.update_donation_by_id(donation_id, data)
        }), 200
    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        current_app.logger.error("update donation fail: donation_id: %s", donation_id)
        return jsonify({"errors": {"error": error.__dict__}}), 400
