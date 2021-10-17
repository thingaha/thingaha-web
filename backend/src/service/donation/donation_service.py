"""Donation service class for CRUD actions"""
from typing import List, Any, Optional, Dict

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql import func

from common.data_schema import donation_schema
from common.error import SQLCustomError, RequestDataEmpty, ValidateFail, ThingahaCustomError
from models.donation import DonationModel
from service.service import Service


class DonationService(Service):
    """
    donation service class for CRUD actions
    define specific params for donation service in DonationService Class
    """
    def __init__(self, logger=None) -> None:
        super().__init__(logger)

    def get_all_donations_records(self, page: int = 1, per_page : int = 20) -> (List, Any):
        """
        get all donation
        :params page
        :params per_page
        :return: donation list of dict
        """
        try:
            self.logger.info("Get Donation list")
            donations = DonationModel.get_all_donations(page, per_page)
            return {
                "donations": [donation.donation_dict(user, student) for donation, user, student in donations.items],
                "total_count": donations.total,
                "current_page": donations.page,
                "next_page": donations.next_num,
                "prev_page": donations.prev_num,
                "pages": donations.pages
            }
        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="GET Donation SQL ERROR")

    def get_all_donator_donations_records(self, user_id: int, page: int = 1, per_page : int = 20) -> (List, Any):
        """
        get all donation
        :params page
        :params per_page
        :return: donation list of dict
        """
        try:
            self.logger.info("Get Donation list")
            donations = DonationModel.get_all_donator_donations(user_id, page, per_page)
            return {
                "donations": [donation.donation_dict(user, student) for donation, user, student in donations.items],
                "total_count": donations.total,
                "current_page": donations.page,
                "next_page": donations.next_num,
                "prev_page": donations.prev_num,
                "pages": donations.pages
            }
        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="GET Donation SQL ERROR")

    def get_donations_records_by_year_month(self, year: int, month: str) -> Dict[str, Any]:
        """
        get donations for a given year and month
        :params page
        :params per_page
        :return: donation list of dict
        """
        self.logger.debug("Get Donation list by year and month")
        donations = DonationModel.get_donations_by_year_month(year, month.lower())
        return {
            "donations": [donation.donation_dict(user, student) for donation, user, student in donations.items],
            "total_count": donations.total,
            "current_page": donations.page,
            "next_page": donations.next_num,
            "prev_page": donations.prev_num,
            "pages": donations.pages
        }

    def get_donator_donations_records_by_year_month(self, year: int, month: str, user_id: int) -> Dict[str, Any]:
        """
        get donations for a given year and month
        :params page
        :params per_page
        :return: donation list of dict
        """
        self.logger.debug("Get Donation list by year and month")
        donations = DonationModel.get_donator_donations_by_year_month(year, month.lower(), user_id)
        return {
            "donations": [donation.donation_dict(user, student) for donation, user, student in donations.items],
            "total_count": donations.total,
            "current_page": donations.page,
            "next_page": donations.next_num,
            "prev_page": donations.prev_num,
            "pages": donations.pages
        }

    def search_donation_records(self, year: Optional[int], month: Optional[str], keyword: Optional[str], per_page: int = 20, page: int = 1) -> Dict[str, Any]:
        """
        get donations for a given year and month
        :params page
        :params per_page
        :return: donation list of dict
        """
        self.logger.debug("Get Donation list by search (year, month, keyword): {}, {}, {}, {}, {}".format(year, month, keyword, page, per_page))
        donations = DonationModel.search_donations(year=year, month=month, keyword=keyword, page=page, per_page=per_page)
        self.logger.debug("Total: {}".format(donations.items))
        return {
            "donations": [donation.donation_dict(user, student) for donation, user, student in donations.items],
            "total_count": donations.total,
            "current_page": donations.page,
            "next_page": donations.next_num,
            "prev_page": donations.prev_num,
            "pages": donations.pages
        }


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
            return DonationModel.create_donation(DonationModel(**data))
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
            return DonationModel.update_donation(donation_id, DonationModel(**data))
        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="Update donation by ID SQL ERROR")
        except SQLCustomError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="No record for requested donation")

    def update_donation_status_by_id(self, donation_id: int, status: str) -> bool:
        """
        put donation by id
        :param donation_id:
        :param status:
        :return:
        """

        try:
            self.logger.info("Update donation info by donation_id:{}".format(donation_id))
            paid_at = func.now() if status == "paid" else None
            return DonationModel.update_donation_status_by_id(donation_id, paid_at)

        except SQLAlchemyError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="Update donation by ID SQL ERROR")
        except SQLCustomError as error:
            self.logger.error("Error: {}".format(error))
            raise SQLCustomError(description="No record for requested donation")
