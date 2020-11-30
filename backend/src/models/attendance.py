"""attendance model class, include migrate and CRUD actions"""
from __future__ import annotations

from datetime import date
from typing import List

from flask_sqlalchemy import Pagination
from sqlalchemy import and_
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import relationship

from common.error import SQLCustomError
from database import db
from models.school import SchoolModel
from models.student import StudentModel


class AttendanceModel(db.Model):
    __tablename__ = "attendances"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False)
    school_id = db.Column(db.Integer, db.ForeignKey("schools.id"), nullable=False)
    grade = db.Column(
        db.Enum("KG", "G-1", "G-2", "G-3", "G-4", "G-5", "G-6", "G-7", "G-8", "G-9", "G-10", "G-11", "G-12",
                name="grade"))
    year = db.Column(db.Integer, nullable=False)
    enrolled_date = db.Column(db.Date(), nullable=True)
    school = relationship("SchoolModel", foreign_keys=[school_id])
    student = relationship("StudentModel", foreign_keys=[student_id])

    def __init__(self, student_id: str, school_id: str, grade: str, year: str, enrolled_date: date) -> None:
        self.student_id = student_id
        self.school_id = school_id
        self.grade = grade
        self.year = year
        self.enrolled_date = enrolled_date

    def __repr__(self):
        return f"<Attendance for student id:  {self.student_id}>"

    def attendance_dict(self, school: SchoolModel, student: StudentModel):
        """
        Return object data for viewing easily serializable format
        :param school:
        :param student:
        :return:
        """
        return {
            "id": self.id,
            "grade": self.grade,
            "year": self.year,
            "enrolled_date": self.enrolled_date.strftime("%d-%m-%Y"),
            "school": school.school_dict(),
            "student": student.student_dict()
        }

    @staticmethod
    def create_attendance(new_attendance) -> bool:
        """
        create new_attendance
        :param new_attendance:
        :return: bool
        """
        try:
            db.session.add(new_attendance)
            db.session.commit()
            return new_attendance.id
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def get_all_attendances(page) -> Pagination:
        """
        get all Attendance records
        :params page
        :return: Attendance Pagination Object
        """
        try:
            return db.session.query(AttendanceModel, SchoolModel, StudentModel).\
                filter(AttendanceModel.school_id == SchoolModel.id).\
                filter(AttendanceModel.student_id == StudentModel.id).paginate(page=page, error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_attendances_by_year(page: int, year: int) -> Pagination:
        """
        get all attendance by year
        :params page
        :params year
        :return: Attendance Pagination Object
        """
        try:
            return db.session.query(AttendanceModel, SchoolModel, StudentModel).\
                filter(AttendanceModel.school_id == SchoolModel.id).\
                filter(AttendanceModel.student_id == StudentModel.id).\
                filter(AttendanceModel.year == year).paginate(page=page, error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_attendances_by_grade(page: int, grade: str) -> Pagination:
        """
        get all attendances by grade
        :params page
        :params grade
        :return: Attendance Pagination Object
        """
        try:
            return db.session.query(AttendanceModel, SchoolModel, StudentModel). \
                filter(AttendanceModel.school_id == SchoolModel.id). \
                filter(AttendanceModel.student_id == StudentModel.id). \
                filter(AttendanceModel.grade == grade).paginate(page=page, error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_attendances_by_grade_year(page: int, grade: str, year: int) -> Pagination:
        """
        get all attendances by grade and year
        :params page
        :params grade
        :return: Attendance Pagination Object
        """
        try:
            return db.session.query(AttendanceModel, SchoolModel, StudentModel). \
                filter(AttendanceModel.school_id == SchoolModel.id). \
                filter(AttendanceModel.student_id == StudentModel.id).\
                filter(and_(AttendanceModel.grade == grade, AttendanceModel.year == year)).\
                paginate(page=page, error_out=False)
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def get_attendance_by_id(attendance_id: int) -> List[AttendanceModel]:
        """
        get all Attendance records
        :param attendance_id
        :return: Attendance list
        """
        try:
            return db.session.query(AttendanceModel, SchoolModel, StudentModel). \
                filter(AttendanceModel.school_id == SchoolModel.id). \
                filter(AttendanceModel.student_id == StudentModel.id).\
                filter(AttendanceModel.id == attendance_id).first()
        except SQLAlchemyError as error:
            raise error

    @staticmethod
    def delete_attendance_by_id(attendance_id: int) -> bool:
        """
        delete Attendance by id
        :param attendance_id:
        :return:
        """
        try:
            if not db.session.query(AttendanceModel).filter(AttendanceModel.id == attendance_id).delete():
                return False
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error

    @staticmethod
    def update_attendance(attendance_id: int, attendance: AttendanceModel) -> bool:
        """
        update attendance info by id
        :param attendance_id:
        :param attendance:
        :return: bool
        """
        try:
            target_attendance = db.session.query(AttendanceModel).filter(AttendanceModel.id == attendance_id).first()
            if not target_attendance:
                raise SQLCustomError("No record for requested attendance")
            target_attendance.student_id = attendance.student_id
            target_attendance.school_id = attendance.school_id
            target_attendance.grade = attendance.grade
            target_attendance.year = attendance.year
            target_attendance.enrolled_date = attendance.enrolled_date
            db.session.commit()
            return True
        except SQLAlchemyError as error:
            db.session.rollback()
            raise error
