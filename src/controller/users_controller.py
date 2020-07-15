from flask import Blueprint, request

from database import db
from models.user import UsersModel

user = Blueprint("user", __name__, url_prefix="/user")


@user.route("/", methods=["GET"])
def hello_world():
    return "Hello world", 200


@user.route('/user', methods=["POST", "GET"])
def handle_cars():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_user = UsersModel(name=data["name"], email=data["email"], address=data["address"],
                                  password=data["password"], role=data["role"], country=data["country"])
            db.session.add(new_user)
            db.session.commit()
            return {"message": f"user {new_user.name} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

    elif request.method == 'GET':
        users = UsersModel.query.all()
        results = [
            {
                "name": user.name,
                "email": user.email,
                "address": user.address,
                "role": user.role
            } for user in users]

        return {"count": len(results), "users": results}
