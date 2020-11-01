"""donation model class, include migrate and CRUD actions"""
from datetime import datetime

from sqlalchemy.exc import SQLAlchemyError

from database import db


class DonationModel(db.Model):
    __tablename__ = "donations"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    attendance_id = db.Column(db.Integer, db.ForeignKey("attendances.id"), nullable=False)
    transfer_id = db.Column(db.Integer, db.ForeignKey("transfers.id"), nullable=True)
    year = db.Column(db.Integer, nullable=False)
    month = db.Column(db.Enum("january", "february", "march", "april", "may", "june",
                              "july", "august", "september", "october", "november", "december", name="month"))
    mmk_amount = db.Column(db.Float())
    jpy_amount = db.Column(db.Float())
    paid_at = db.Column(db.DateTime(), nullable=True)

    def __init__(self, user_id: int, attendance_id: int, transfer_id: int, year: int, month: str, mmk_amount: float,
                 jpy_amount: float, paid_at: datetime) -> None:
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

    @staticmethod
    def create_donation(new_donation) -> bool:
        """
        create  new_donation
        :param new_donation:
        :return: bool
        """
        try:
            db.session.add(new_donation)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            # to put log
            return False


