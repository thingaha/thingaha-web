"""student model class, include migrate and CRUD actions"""

from datetime import datetime, date
from typing import Dict, Any

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import relationship

from database import db
from models.address import AddressModel


class StudentModel(db.Model):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    deactivated_at = db.Column(db.DateTime(), nullable=True)
    birth_date = db.Column(db.Date(), nullable=True)
    father_name = db.Column(db.UnicodeText())
    mother_name = db.Column(db.UnicodeText())
    parents_occupation = db.Column(db.Text())
    address_id = db.Column(db.Integer, db.ForeignKey("addresses.id"), nullable=False)
    address = relationship("AddressModel", foreign_keys=[address_id])

    def __init__(self, name: str,
                 deactivated_at: datetime, birth_date: date, father_name: str, mother_name: str,
                 parents_occupation: str, address_id: int):
        self.name = name
        self.deactivated_at = deactivated_at
        self.birth_date = birth_date
        self.father_name = father_name
        self.mother_name = mother_name
        self.parents_occupation = parents_occupation
        self.address_id = address_id

    def __repr__(self):
        return f"<Student {self.name}>"

    def student_dict(self) -> Dict[str, Any]:
        """
        Return object data in easily serializable format
        """
        return {
            "id": self.id,
            "name": self.name,
            "deactivated_at": self.deactivated_at.strftime("%d-%m-%Y") if self.deactivated_at else "",
            "birth_date": self.birth_date.strftime("%d-%m-%Y") if self.birth_date else "",
            "father_name": self.father_name,
            "mother_name": self.mother_name,
            "parents_occupation": self.parents_occupation,
            "address": {
                "id": self.address_id,
                "division": self.address.division,
                "district": self.address.district,
                "township": self.address.township,
                "street_address": self.address.street_address
            }
        }

    @staticmethod
    def create_student(new_student):
        """
        create new student
        :param new_student:
        :return: bool
        """
        try:
            db.session.add(new_student)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            # to put log
            return False

    @staticmethod
    def get_all_student_address() -> dict:
        """
        get all school address for get all address API
        """
        try:
            return db.session.query(AddressModel, StudentModel). \
                filter(AddressModel.id == StudentModel.address_id).filter(AddressModel.type == "student").all()
        except SQLAlchemyError as error:
            raise error
