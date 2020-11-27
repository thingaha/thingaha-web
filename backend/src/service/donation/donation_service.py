"""Donation service class for CRUD actions"""
from typing import List, Any, Optional, Dict

from sqlalchemy.exc import SQLAlchemyError

from common.data_schema import donation_schema
from common.error import SQLCustomError, RequestDataEmpty, ValidateFail, ThingahaCustomError
from models.donation import DonationModel
from service.service import Service


class DonationService(Service):
    """
    school service class for CRUD actions
    define specific params for school service in SchoolService Class
    """
    def __init__(self, logger=None) -> None:
        super().__init__(logger)

    def get_all_donations_records(self, page: int) -> (List, Any):
        """
        get all donation
        :return: donation list of dict
        """
        try:
            self.logger.info("Get Donation list")
            donations = DonationModel.get_all_donations(page)
            return [donation.donation_dict(user, student) for donation, user, student in donations.items], donations.total
        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="GET Donation SQL ERROR")

    def get_donation_by_id(self, donation_id: int) -> Optional[Dict]:
        """
        get donation info by id
        :param donation_id:
        :return: donation list of dict
        """
        try:
            donation_record = DonationModel.get_donation_by_id(donation_id)
            if donation_record:
                donation, user, student = donation_record
                self.logger.info("Get donation info by donation_id:{}".format(donation_id))
                return donation.donation_dict(user, student)
            else:
                self.logger.error("Fail to get donation info by donation_id:{}".format(donation_id))
                raise ThingahaCustomError(description="No record for requested donation id: {}".format(donation_id))
        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="GET Donation by ID SQL ERROR")

    def create_donation(self, data: Dict) -> int:
        """
        create donation records
        :param data:
        :return: created donation id
        """
        if not data:
            raise RequestDataEmpty("Donation data is empty")
        if not self.input_validate.validate_json(data, donation_schema):
            self.logger.error("All donation field input must be required.")
            raise ValidateFail("Donation validation fail")
        try:
            return DonationModel.create_donation(DonationModel(
                user_id=data["user_id"],
                attendance_id=data["attendance_id"],
                transfer_id=data["transfer_id"],
                year=data["year"],
                month=data["month"],
                mmk_amount=data["mmk_amount"],
                jpy_amount=data["jpy_amount"],
                paid_at=data["paid_at"]
                ))
        except SQLAlchemyError as error:
            self.logger.error("Donation create fail. error %s", error)
            raise SQLCustomError("Donation create fail")

    def delete_donation_by_id(self, donation_id: int) -> bool:
        """
        delete donation by id
        :param donation_id:
        :return:
        """
        try:
            self.logger.info("Delete donation info by donation_id:{}".format(donation_id))
            return DonationModel.delete_donation_by_id(donation_id)
        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="Delete Donation by ID SQL ERROR")

    def update_donation_by_id(self, donation_id: int, data: Dict) -> bool:
        """
        put donation by id
        :param donation_id:
        :param data:
        :return:
        """
        if not data:
            raise RequestDataEmpty("Donation data is empty")
        if not self.input_validate.validate_json(data, donation_schema):
            self.logger.error("All donation field input must be required.")
            raise ValidateFail("Donation update validation fail")
        try:
            self.logger.info("Update donation info by donation_id:{}".format(donation_id))
            return DonationModel.update_donation(donation_id, DonationModel(
                user_id=data["user_id"],
                attendance_id=data["attendance_id"],
                transfer_id=data["transfer_id"],
                year=data["year"],
                month=data["month"],
                mmk_amount=data["mmk_amount"],
                jpy_amount=data["jpy_amount"],
                paid_at=data["paid_at"]))
        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="Update donation by ID SQL ERROR")
        except SQLCustomError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="No record for requested donation")
