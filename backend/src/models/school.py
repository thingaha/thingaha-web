from sqlalchemy.exc import SQLAlchemyError

from database import db


class SchoolModel(db.Model):
    __tablename__ = "schools"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    contact_info = db.Column(db.String(), nullable=False)
    address_id = db.Column(db.Integer, db.ForeignKey("addresses.id"), nullable=False)
    address = db.relationship("addresses", backref=db.backref("schools", lazy=True))

    def __init__(self, name: str, email: str, address: str, hashed_password: str, role: str, country: str) -> None:
        self.name = name
        self.email = email
        self.address = address
        self.hashed_password = hashed_password
        self.role = role
        self.country = country

    def __repr__(self):
        return f"<School {self.name}>"

    @staticmethod
    def create_school(new_school) -> bool:
        """
        create new_school
        :param new_school:
        :return: bool
        """
        try:
            db.session.add(new_school)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            # to put log
            return False

