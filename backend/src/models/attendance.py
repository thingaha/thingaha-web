"""attendance model class, include migrate and CRUD actions"""
from datetime import date

from sqlalchemy.exc import SQLAlchemyError

from database import db


class AttendanceModel(db.Model):
    __tablename__ = "attendances"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False)
    school_id = db.Column(db.Integer, db.ForeignKey("schools.id"), nullable=False)
    grade = db.Column(
        db.Enum("KG", "G-1", "G-2", "G-3", "G-4", "G-5", "G-6", "G-7", "G-8", "G-9", "G-10", "G-11", "G-12",
                name="grade"))
    year = db.Column(db.UnicodeText(), nullable=False)
    enrolled_date = db.Column(db.Date(), nullable=True)

    def __init__(self, student_id: str, school_id: str, grade: str, year: str, enrolled_date: date) -> None:
        self.student_id = student_id
        self.school_id = school_id
        self.grade = grade
        self.year = year
        self.enrolled_date = enrolled_date

    def __repr__(self):
        return f"<Attendance for student id:  {self.student_id}>"

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
            return True
        except SQLAlchemyError as e:
            # to put log
            return False
