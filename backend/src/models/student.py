"""student model class, include migrate and CRUD actions"""
from __future__ import annotations

from datetime import datetime, date
from typing import Dict, Any, List, Optional
from flask_sqlalchemy import Pagination
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import relationship

from common.error import SQLCustomError
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
    photo = db.Column(db.Text())
    address_id = db.Column(db.Integer, db.ForeignKey("addresses.id"), nullable=False)
    address = relationship("AddressModel", foreign_keys=[address_id])

    def __init__(self, name: str,
                 deactivated_at: datetime, birth_date: date, father_name: str, mother_name: str,
                 parents_occupation: str, photo: str, address_id: int):
        self.name = name
        self.deactivated_at = deactivated_at
        self.birth_date = birth_date
        self.father_name = father_name
        self.mother_name = mother_name
        self.parents_occupation = parents_occupation
        self.photo = photo
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
            "photo": self.photo,
            "address": {
                "id": self.address_id,
                "division": self.address.division,
                "district": self.address.district,
                "township": self.address.township,
                "street_address": self.address.street_address
            }
        }

    @staticmethod
    def get_student_by_id(student_id: int) -> Optional[StudentModel]:
        """
        get student by id
        :param student_id:
        :return: student info
        """
        try:
            return db.session.query(StudentModel). \
                join(AddressModel). \
                filter(StudentModel.id == student_id).first()
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_student_by_address_ids(addresses_ids: tuple) -> List[StudentModel]:
        """
        get student by ids
        :param addresses_ids:
        :return: student info
        """
        try:
            return db.session.query(StudentModel).filter(StudentModel.address_id.in_(addresses_ids)).all()
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_students_by_name(name) -> List[StudentModel]:
        """
        get students by name (as name is not unique, multiple records can be returned)
        :param name:
        :return: student info list
        """
        try:
            return db.session.query(StudentModel).join(AddressModel).filter(StudentModel.name == name)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_students_by_birth_date(birth_date) -> List[StudentModel]:
        """
        get students by birth_date (as birth_date is not unique, multiple records can be returned)
        :param birth_date:
        :return: student info list
        """
        try:
            return db.session.query(StudentModel).join(AddressModel).filter(StudentModel.birth_date == birth_date)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_all_students(page: int = 1, per_page: int = 20) -> Pagination:
        """
        get all students
        :param page:
        :param per_page:
        :return: students list of dict
        """
        try:
            return db.session.query(StudentModel).join(AddressModel).\
                paginate(page=page, per_page=per_page, error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_all_student_address(page: int = 1, per_page: int = 20) -> Pagination:
        """
        get all school address for get all address API
        :params page
        :params per_page
        :return
        """
        try:
            return db.session.query(AddressModel, StudentModel). \
                filter(AddressModel.id == StudentModel.address_id).filter(
                AddressModel.type == "student").paginate(page=page, per_page=per_page,error_out=False)
        except SQLAlchemyError as error:
            raise error

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
            return new_student.id
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def update_student(student_id, student) -> bool:
        """
        update student info by id
        :param student_id:
        :param student:
        :return: bool
        """
        try:
            target_student = db.session.query(StudentModel).filter(StudentModel.id == student_id).first()
            if not target_student:
                raise SQLCustomError("No record for requested student")
            target_student.name = student.name
            target_student.deactivated_at = student.deactivated_at
            target_student.birth_date = student.birth_date
            target_student.father_name = student.father_name
            target_student.mother_name = student.mother_name
            target_student.parents_occupation = student.parents_occupation
            target_student.photo = student.photo
            target_student.address_id = student.address_id
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def delete_student(student_id) -> bool:
        """
        delete student by id
        :param student_id:
        :return: bool
        """
        try:
            if not db.session.query(StudentModel).filter(StudentModel.id == student_id).delete():
                return False
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

