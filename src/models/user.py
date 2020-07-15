from database import db


class UsersModel(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    email = db.Column(db.String())
    address = db.Column(db.UnicodeText())
    password = db.Column(db.Text())
    role = db.Column(db.Enum("sub_admin", "donator", "admin", name="role"))
    country = db.Column(db.Enum("jp", "mm", "sg", "th", name="country"))

    def __init__(self, name, email, address, password, role, country):
        self.name = name
        self.email = email
        self.address = address
        self.password = password
        self.role = role
        self.country = country

    def __repr__(self):
        return f"<User {self.name}>"

