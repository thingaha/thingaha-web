"""donation model class, include migrate and CRUD actions"""
from __future__ import annotations

from datetime import datetime
from typing import Optional

from flask_sqlalchemy import Pagination
from sqlalchemy import or_, desc, Integer, Enum, DateTime, Column, Float
from sqlalchemy.exc import SQLAlchemyError, DataError
from sqlalchemy.orm import joinedload

from common.error import SQLCustomError
from database import db
from models.attendance import AttendanceModel
from models.student import StudentModel
from models.user import UserModel


class DonationModel(db.Model):
    __tablename__ = "donations"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, db.ForeignKey("users.id"), nullable=False)
    attendance_id = Column(Integer, db.ForeignKey("attendances.id"), nullable=False)
    transfer_id = Column(Integer, db.ForeignKey("transfers.id"), nullable=True)
    year = Column(Integer, nullable=False)
    month = Column(Enum("january", "february", "march", "april", "may", "june",
                        "july", "august", "september", "october", "november", "december", name="month"))
    mmk_amount = Column(Float)
    jpy_amount = Column(Float)
    paid_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship("UserModel", lazy=True)
    attendance = db.relationship("AttendanceModel", lazy=True)

    def __init__(self, user_id: int, attendance_id: int, transfer_id: Optional[int], year: int, month: str, mmk_amount: float,
                 jpy_amount: float, paid_at: Optional[datetime]) -> None:
        self.user_id = user_id
        self.attendance_id = attendance_id
        self.transfer_id = transfer_id
        self.year = year
        self.month = month
        self.mmk_amount = mmk_amount
        self.jpy_amount = jpy_amount
        self.paid_at = paid_at

    def __repr__(self):
        return f"<Donation Records for user_id {self.user_id}>"

    def donation_dict(self, user: UserModel, student: StudentModel):
        """
        Return object data for viewing easily serializable format
        :param user:
        :param student:
        :return:
        """
        return {
            "id": self.id,
            "user": user.as_dict(),
            "year": self.year,
            "month": self.month,
            "student": student.student_dict(),
            "mmk_amount": self.mmk_amount,
            "jpy_amount": self.jpy_amount,
            "status": "pending" if self.paid_at is None else "paid",
            "paid_at": self.paid_at,
            "attendance_id": self.attendance_id,
            "transfer_id": self.transfer_id,
        }

    @staticmethod
    def create_donation(new_donation: DonationModel) -> int:
        """
        create new_donation
        :param new_donation:
        :return: int
        """
        try:
            db.session.add(new_donation)
            db.session.commit()
            return new_donation.id
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_all_donations(page: int = 1, per_page: int = 20) -> Pagination:
        """
        get all donation records
        :params page
        :params per_page
        :return: donation list
        """
        try:
            return db.session.query(DonationModel, UserModel, StudentModel). \
                filter(DonationModel.user_id == UserModel.id). \
                filter(DonationModel.attendance_id == AttendanceModel.id). \
                filter(AttendanceModel.id == StudentModel.id).order_by(desc(DonationModel.created_at)).paginate(page=page, per_page=per_page, error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_all_donator_donations(user_id: int, page: int = 1, per_page: int = 20) -> Pagination:
        """
        get all donator donation records
        :params page
        :params per_page
        :return: donation list
        """
        try:
            return db.session.query(DonationModel, UserModel, StudentModel). \
                filter(DonationModel.user_id == UserModel.id). \
                filter(DonationModel.attendance_id == AttendanceModel.id). \
                filter(AttendanceModel.id == StudentModel.id).filter(DonationModel.user_id == user_id).order_by(desc(DonationModel.created_at)).paginate(page=page, per_page=per_page, error_out=False)
        except (SQLAlchemyError, DataError) as error:
            raise error

    @staticmethod
    def get_donations_by_year_month(year: int, month: str) -> Pagination:
        """
        get all donation records for given year and month
        :params page
        :params per_page
        :return: donation list
        """
        try:
            return db.session.query(DonationModel, UserModel, StudentModel). \
                filter(DonationModel.user_id == UserModel.id). \
                filter(DonationModel.attendance_id == AttendanceModel.id). \
                filter(AttendanceModel.id == StudentModel.id). \
                filter(DonationModel.year == year). \
                filter(DonationModel.month == month).paginate(page=1, per_page=1000, error_out=False)
        except (SQLAlchemyError, DataError) as error:
            raise error

    @staticmethod
    def get_donator_donations_by_year_month(year: int, month: str, user_id: int) -> Pagination:
        """
        get all donator donation records for given year and month
        :params page
        :params per_page
        :return: donation list
        """
        try:
            return db.session.query(DonationModel, UserModel, StudentModel). \
                filter(DonationModel.user_id == UserModel.id). \
                filter(DonationModel.attendance_id == AttendanceModel.id). \
                filter(AttendanceModel.id == StudentModel.id). \
                filter(DonationModel.year == year). \
                filter(DonationModel.month == month).\
                filter(DonationModel.user_id == user_id).paginate(page=1, per_page=1000, error_out=False)
        except (SQLAlchemyError, DataError) as error:
            raise error

    @staticmethod
    def search_donations(year: Optional[int], month: Optional[str], keyword: Optional[str], per_page: int = 20, page: int = 1) -> Pagination:
        """
        get all donator donation records for given year and month
        :params page
        :params per_page
        :return: donation list
        """
        try:
            query = db.session.query(DonationModel, UserModel, StudentModel). \
                join(UserModel). \
                filter(DonationModel.user_id == UserModel.id). \
                filter(DonationModel.attendance_id == AttendanceModel.id). \
                filter(AttendanceModel.id == StudentModel.id)

            if year is not None:
                query = query.filter(DonationModel.year == year)

            if month is not None:
                query = query.filter(DonationModel.month == month)

            if keyword is not None:
                query = query.filter(or_(UserModel.display_name.ilike('%' + keyword + '%'),
                                              UserModel.email.ilike('%' + keyword + '%')))

            return query.paginate(page=page, per_page=per_page, error_out=False)
        except (SQLAlchemyError, DataError) as error:
            raise error

    @staticmethod
    def get_donation_by_id(donation_id: int) -> DonationModel:
        """
        get all donation records
        :param donation_id
        :return: donation list
        """
        try:
            return db.session.query(DonationModel, UserModel, StudentModel). \
                filter(DonationModel.user_id == UserModel.id). \
                filter(DonationModel.attendance_id == AttendanceModel.id). \
                filter(AttendanceModel.id == StudentModel.id). \
                filter(DonationModel.id == donation_id).first()
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def delete_donation_by_id(donation_id: int) -> bool:
        """
        delete donation by id
        :param donation_id:
        :return:
        """
        try:
            if not db.session.query(DonationModel).filter(DonationModel.id == donation_id).delete():
                return False
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def update_donation(donation_id: int, donation: DonationModel) -> bool:
        """
        update donation info by id
        :param donation_id:
        :param donation:
        :return: bool
        """
        try:
            target_donation = db.session.query(DonationModel).filter(DonationModel.id == donation_id).first()
            if not target_donation:
                raise SQLCustomError("No record for requested donation")
            target_donation.user_id = donation.user_id
            target_donation.attendance_id = donation.attendance_id
            target_donation.transfer_id = donation.transfer_id
            target_donation.month = donation.month
            target_donation.year = donation.year
            target_donation.mmk_amount = donation.mmk_amount
            target_donation.jpy_amount = donation.jpy_amount
            target_donation.paid_at = donation.paid_at
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def update_donation_status_by_id(donation_id: int, paid_at: Optional[str]) -> bool:
        """
        update donation info by id
        :param donation_id:
        :param paid_at:
        :return: bool
        """
        try:
            donation = DonationModel.query.filter(DonationModel.id == str(donation_id)).first()
            donation.paid_at = paid_at
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error
