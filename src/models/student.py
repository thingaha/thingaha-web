from database import db
from sqlalchemy.exc import SQLAlchemyError


class StudentModel(db.Model):
    __tablename__ = "Students"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    deactivated_at = db.Column(db.DateTime(), nullable=True)
    birth_date = db.Column(db.Date(), nullable=True)
    father_name = db.Column(db.UnicodeText())
    mother_name = db.Column(db.UnicodeText())
    parents_occupation = db.Column(db.Text())
    address_id = db.Column(db.Integer, db.ForeignKey("addresses.id"))

    def __init__(self, name, deactivated_at, birth_date, father_name, mother_name, parents_occupation, address_id):
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

