from datetime import datetime, date

from sqlalchemy.exc import SQLAlchemyError

from database import db


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

