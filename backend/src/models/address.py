from sqlalchemy.exc import SQLAlchemyError

from database import db


class AddressModel(db.Model):
    __tablename__ = "addresses"

    id = db.Column(db.Integer, primary_key=True)
    division = db.Column(db.Enum("yangon", "ayeyarwady", "chin", "kachin", "kayah",
                                 "kayin", "mon", "rakhine", "shan", "bago", "magway",
                                 "mandalay", "sagaing", "tanintharyi",
                                 name="division"))
    district = db.Column(db.UnicodeText())
    township = db.Column(db.UnicodeText())
    address = db.Column(db.UnicodeText())

    def __init__(self, division: str, district: str, township: str, address: str) -> None:
        self.division = division
        self.district = district
        self.township = township
        self.address = address

    def __repr__(self):
        return f"<Address {self.address}>"

    @staticmethod
    def create_address(new_address) -> bool:
        """
        create new_address for student
        :param new_address:
        :return: bool
        """
        try:
            db.session.add(new_address)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            # to put log
            return False

