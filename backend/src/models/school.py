from sqlalchemy.exc import SQLAlchemyError

from database import db


class SchoolModel(db.Model):
    __tablename__ = "schools"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    contact_info = db.Column(db.String(), nullable=False)
    address_id = db.Column(db.Integer, db.ForeignKey("addresses.id"), nullable=False)

    def __init__(self, name: str, contact_info: str, address_id: int) -> None:
        self.name = name
        self.contact_info = contact_info
        self.address_id = address_id

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

