"""API route for Donation API"""
from flask import request, current_app, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required, get_jwt_identity
from functools import wraps

from common.error import SQLCustomError, RequestDataEmpty, ValidateFail, ThingahaCustomError
from controller.api import api, post_request_empty, custom_error, full_admin, sub_admin
from service.donation.donation_service import DonationService
donation_service = DonationService()

def with_donation_service(func):
    """
    Decorator function to set donation service instance on each route that needs it.
    """
    wraps(func)

    def decorated(*args, **kwargs):
        donation_service = DonationService(logger=current_app.logger)
        return func(donation_service, *args, **kwargs)

    decorated.__name__ = func.__name__
    return decorated

@api.route("/donator_donations", methods=["GET"])
@jwt_required
@cross_origin()
@with_donation_service
def get_my_donations(donation_service: DonationService):
    try:
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 20, type=int)
        year = request.args.get("year", None, type=int)
        month = request.args.get("month", None, type=str)
        user_id = get_jwt_identity()

        if year is not None and month is not None:
            return jsonify({
                "data": donation_service.get_donator_donations_records_by_year_month(year, month, user_id)
            }), 200
        else:
            return jsonify({
                "data": donation_service.search_donation_records(year=year, month=month, keyword=None, page=page, per_page=per_page)
            }), 200

    except SQLCustomError as error:
        current_app.logger.error("Error in get all donator donation records")
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/donations", methods=["GET"])
@jwt_required
@cross_origin()
@with_donation_service
def get_donations(donation_service: DonationService):
    try:
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 20, type=int)
        year = request.args.get("year", None, type=int)
        month = request.args.get("month", None, type=str)
        keyword = request.args.get("keyword", None, type=str)

        if year or month or keyword:
            return jsonify({
                "data": donation_service.search_donation_records(
                    year=year,
                    month=month,
                    keyword=keyword,
                    page=page,
                    per_page=per_page
            )
            }), 200
        else:
            return jsonify({
                "data": donation_service.get_all_donations_records(page, per_page)
            }), 200

    except SQLCustomError as error:
        current_app.logger.error("Error in get all donation records")
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/donations/<int:donation_id>", methods=["GET"])
@jwt_required
@cross_origin()
@with_donation_service
def get_donation_by_id(donation_service: DonationService, donation_id: int):
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
@with_donation_service
def create_donation(donation_service: DonationService):
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
            "mmk_amount": float(data.get("mmk_amount")),
            "jpy_amount": float(data.get("jpy_amount")),
            "paid_at": data.get("paid_at")
        })
        current_app.logger.info("Create donation success. donation: %s", data.get("user_id"))
        return get_donation_by_id(donation_id)
    except (RequestDataEmpty, SQLCustomError, ValidateFail) as error:
        current_app.logger.error("Create donation request fail")
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/donations/<int:donation_id>", methods=["DELETE"])
@jwt_required
@full_admin
@cross_origin()
@with_donation_service
def delete_donation(donation_service: DonationService, donation_id: int):
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
@with_donation_service
def update_donation(donation_service: DonationService, donation_id: int):
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

        status = donation_service.update_donation_by_id(donation_id, {
            "user_id": data.get("user_id"),
            "attendance_id": data.get("attendance_id"),
            "transfer_id": data.get("transfer_id"),
            "month": data.get("month"),
            "year": data.get("year"),
            "mmk_amount": float(data.get("mmk_amount")),
            "jpy_amount": float(data.get("jpy_amount")),
            "paid_at": data.get("paid_at") or donation.get("paid_at")
        })
        if status:
            current_app.logger.info("Success update donation for donation_id: %s", donation_id)
            return get_donation_by_id(donation_id)
        else:
            current_app.logger.error("Fail update donation for donation_id: %s", donation_id)
            return custom_error("Fail to update donation id: {}".format(donation_id))

    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        current_app.logger.exception("Update donation fail: donation_id: %s", donation_id)
        return jsonify({"errors": [error.__dict__]}), 400


@api.route("/donations/<int:donation_id>", methods=["PATCH"])
@jwt_required
@sub_admin
@cross_origin()
@with_donation_service
def update_donation_status(donation_service: DonationService, donation_id: int):
    """
    update donation by ID
    :param donation_id:
    :return:
    """
    data = request.get_json()
    status = data.get("status")

    if data is None or status is None:
        return post_request_empty()

    if status not in ["paid", "pending"]:
        return custom_error("Status should be paid or pending".format(status))

    donation = donation_service.get_donation_by_id(donation_id)
    if not donation:
        return custom_error("No donation record for requested id: {}".format(donation_id))

    try:
        success = donation_service.update_donation_status_by_id(donation_id, status)
        if success:
            current_app.logger.info("Success update donation for donation_id: {}".format(donation_id))
            return get_donation_by_id(donation_id)
        else:
            current_app.logger.error("Fail update donation for donation_id: {}".format(donation_id))
            return custom_error("Fail to update donation id: {}".format(donation_id))

    except (SQLCustomError, ValidateFail, RequestDataEmpty) as error:
        current_app.logger.exception("Update donation fail: donation_id: {}".format(donation_id))
        return jsonify({"errors": [error.__dict__]}), 400
