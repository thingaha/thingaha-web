"""API route for Donation API"""
from flask import request, current_app, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required

from common.error import SQLCustomError, RequestDataEmpty, ValidateFail, ThingahaCustomError
from controller.api import api, post_request_empty, custom_error, full_admin, sub_admin
from service.donation.donation_service import DonationService

donation_service = DonationService()


@api.route("/donations", methods=["GET"])
@jwt_required
@cross_origin()
def get_donations():
    try:
        page = request.args.get("page", 1, type=int)
        donations, count = donation_service.get_all_donations_records(page)
        current_app.logger.info("Get all donation records")
        return jsonify({
            "data": {
                "count": count,
                "donations": donations
            }}), 200
    except SQLCustomError as error:
        current_app.logger.error("Error in get all donation records")
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/donations/<int:donation_id>", methods=["GET"])
@jwt_required
@cross_origin()
def get_donation_by_id(donation_id: int):
    """
    get donation by donation id
    :return:
    """
    try:
        donation = donation_service.get_donation_by_id(donation_id)
        current_app.logger.info("Return data for donation_id: {}".format(donation_id))
        return jsonify({
            "data": {
                "donation": donation
            }}), 200
    except (SQLCustomError, ThingahaCustomError) as error:
        current_app.logger.error("Return error for donations: {}".format(donation_id))
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/donations", methods=["POST"])
@jwt_required
@sub_admin
@cross_origin()
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
        current_app.logger.info("Create donation success. donation: %s", data.get("user_id"))
        return get_donation_by_id(donation_id)
    except (RequestDataEmpty, SQLCustomError, ValidateFail) as error:
        current_app.logger.error("Create donation request fail")
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/donations/<int:donation_id>", methods=["DELETE"])
@jwt_required
@full_admin
@cross_origin()
def delete_donation(donation_id):
    """
    delete donation  by ID
    :param donation_id:
    :return:
    """
    try:
        current_app.logger.info("Delete donation id: {}".format(donation_id))
        return jsonify({
            "status": donation_service.delete_donation_by_id(donation_id)
        }), 200
    except SQLCustomError as error:
        current_app.logger.error("Fail to delete donation_id: %s".format(donation_id))
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/donations/<int:donation_id>", methods=["PUT"])
@jwt_required
@sub_admin
@cross_origin()
def update_donation(donation_id: int):
    """
    update donation by ID
    :param donation_id:
    :return:
    """
    data = request.get_json()
    if data is None:
        return post_request_empty()

    donation = donation_service.get_donation_by_id(donation_id)
    if not donation:
        return custom_error("No donation record for requested id: {}".format(donation_id))

    try:

        status = donation_service.update_donation_by_id(donation_id, data)
        if status:
            current_app.logger.info("Success update donation for donation_id: %s", donation_id)
            return get_donation_by_id(donation_id)
        else:
            current_app.logger.error("Fail update donation for donation_id: %s", donation_id)
            return custom_error("Fail to update donation id: {}".format(donation_id))

    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        current_app.logger.error("Update donation fail: donation_id: %s", donation_id)
        return jsonify({"errors": [error.__dict__]}), 400
