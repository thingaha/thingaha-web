from sqlalchemy.exc import SQLAlchemyError

from database import db


class UserModel(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    address = db.Column(db.UnicodeText())
    hashed_password = db.Column(db.Text(), nullable=True)
    role = db.Column(db.Enum("sub_admin", "donator", "admin", name="role"))
    country = db.Column(db.Enum("jp", "mm", "sg", "th", name="country"))

    def __init__(self, name: str, email: str, address: str, hashed_password: str, role: str, country: str) -> None:
        self.name = name
        self.email = email
        self.address = address
        self.hashed_password = hashed_password
        self.role = role
        self.country = country

    def __repr__(self):
        return f"<User {self.name}>"

    @staticmethod
    def create_user(new_user) -> bool:
        """
        create new users
        :param new_user:
        :return: bool
        """
        try:
            # replace plain password with flask-Bcrypt
            db.session.add(new_user)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            # to put log
            return False

