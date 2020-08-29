"""transfer model class, include migrate and CRUD actions"""

from sqlalchemy.exc import SQLAlchemyError

from database import db


class TransferModel(db.Model):
    __tablename__ = "transfers"
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=False)
    month = db.Column(db.Enum("january", "february", "march", "april", "may", "june",
                              "july", "august", "september", "october", "november", "december", name="transfer_month"))
    total_mmk = db.Column(db.Float())
    total_jpy = db.Column(db.Float())

    def __init__(self, year: int, month: str, total_mmk: float, total_jpy: float) -> None:
        self.year = year
        self.month = month
        self.total_mmk = total_mmk
        self.total_jpy = total_jpy

    def __repr__(self):
        return f"<Transfer record for {self.month}>"

    @staticmethod
    def create_transfer(new_transfer) -> bool:
        """
        create new transfer record
        :param new_transfer:
        :return: bool
        """
        try:
            db.session.add(new_transfer)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            # to put log
            return False

