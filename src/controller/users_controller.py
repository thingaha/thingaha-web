from flask import Blueprint, request

from models.user import UserModel

user = Blueprint("user", __name__, url_prefix="/user")


@user.route("/user", methods=["POST", "GET"])
def create_user():
    if request.method == "POST":
        if request.is_json:
            data = request.get_json()
            if UserModel.create_user(UserModel(name=data["name"], email=data["email"], address=data["address"],
                                               password=data["password"], role=data["role"], country=data["country"])):
                return {"message": f"user {data.get('name')} has been created successfully."}, 200
            else:
                return {"message": f"user create fail."}, 400
        else:
            return {"error": "The request payload is not in JSON format"}, 400

    elif request.method == "GET":
        users = UserModel.query.all()
        results = [
            {
                "name": user.name,
                "email": user.email,
                "address": user.address,
                "role": user.role
            } for user in users]
        return {"count": len(results), "users": results}
