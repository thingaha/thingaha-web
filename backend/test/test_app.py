import os
import sys

import pytest

sys.path.append(os.path.join(os.path.dirname(__file__), "../src"))
from models.user import UserModel
from models.address import AddressModel
from flask_jwt_extended import create_access_token, JWTManager
from datetime import timedelta
from app import create_app, db


@pytest.fixture
def init_app():
    app = create_app()
    jwt = JWTManager(app)

    @jwt.user_claims_loader
    def add_claims_to_access_token(user):
        return "admin"
    yield app


@pytest.fixture
def client(init_app):
    with init_app.app_context():
        db.create_all()
    yield init_app.test_client()
    with init_app.app_context():
        db.drop_all()


@pytest.fixture
def json_access_token(init_app):
    with init_app.app_context():
        address_id = AddressModel.create_address(AddressModel(
            division="yangon",
            district="aa",
            township="aa",
            street_address="aa",
            type="user"))
        user = UserModel.create_user(UserModel(
            display_name="aa",
            username="aa",
            email="aa@gmail.com",
            address_id=address_id,
            hashed_password="pass",
            role="admin",
            country="mm"))

        access_token = create_access_token(identity=user, expires_delta=timedelta(days=1))
        return {
            "Authorization": "Bearer " + access_token,
            "Content-Type": "application/json"
        }


@pytest.fixture
def student_json():
    return {
        "district": "မရမ်းကုန်းမြို့နယ်",
        "division": "yangon",
        "street_address": "ဉီးဘအိုလမ်း",
        "township": "အမှတ်(၂)ရပ်ကွက်",
        "type": "student",
        "deactivated_at": "2020-07-26T03:37:05.836Z",
        "birth_date": "12-08-2006",
        "father_name": "ဉီးလှ",
        "mother_name": "ဒေါ်မြ",
        "name": "မောင်မောင်",
        "parents_occupation": "လယ်သမား",
        "photo": "https://i.aass.com/originals/a7/65/45/a7654580f501e9501e329978bebd051b.jpg"
    }


@pytest.fixture
def user_json():
    return {
        "username": "MoeMoe",
        "display_name": "MoeMoe",
        "email": "moemoe1@gmail.com",
        "password": "123",
        "role": "admin",
        "country": "mm",
        "district": "pabedan",
        "division": "yangon",
        "donation_active": True,
        "street_address": "18 street",
        "township": "La Thar township"
    }


@pytest.fixture
def address_json():
    return {
        "district": "yangon",
        "division": "yangon",
        "street_address": "11 street",
        "township": "MyaeNiGone",
        "type": "user"
    }


@pytest.fixture
def school_json():
    return {
        "name": "No.(35) Nyanungdon",
        "contact_info": "098",
        "district": "yangon",
        "division": "yangon",
        "street_address": "18 street",
        "township": "La Thar township",
        "type": "school"
    }


@pytest.fixture
def attendance_json():
    return {
        "student_id": 1,
        "school_id": 1,
        "grade": "G-10",
        "year": "2020",
        "enrolled_date": "2020-02-02"
    }


@pytest.fixture
def transfer_json():
    return {
        "year": 2020,
        "month": "march",
        "total_mmk": 3000,
        "total_jpy": 0
    }


@pytest.fixture
def extra_fund_json():
    return {
        "mmk_amount": 11111,
        "transfer_id": 1
    }


@pytest.fixture
def donation_json():
    return {
        "user_id": 1,
        "attendance_id": 1,
        "transfer_id": 1,
        "month": "january",
        "year": 2020,
        "mmk_amount": 5000.0,
        "jpy_amount": 0.0,
        "paid_at": "2020-02-02"
    }


def test_config(init_app):
    assert init_app.config["TESTING"] is True

# Start Address #


def test_address_get_id(client, json_access_token):
    res = client.get("/api/v1/addresses/1", headers=json_access_token)
    assert res.status_code == 200
    res = client.get("/api/v1/addresses/search?query=XXX", headers=json_access_token)
    assert res.status_code == 200
    res = client.get("/api/v1/addresses?type=user", headers=json_access_token)
    assert res.status_code == 200
    res = client.get("/api/v1/addresses?type=bb", headers=json_access_token)
    assert res.status_code == 400


def test_address_create_update(client, json_access_token, address_json):
    res = client.post("/api/v1/addresses", json=address_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.put("/api/v1/addresses/1", json=address_json, headers=json_access_token)
    assert res.status_code == 200


def test_address_delete(client, json_access_token, address_json):
    res = client.post("/api/v1/addresses", json=address_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.delete("/api/v1/addresses/2", headers=json_access_token)
    assert res.status_code == 200


# End Address #
# Start School #


def test_school(client, json_access_token):
    res = client.get("/api/v1/schools", headers=json_access_token)
    assert res.status_code == 200
    res = client.get("/api/v1/schools?query=ABC", headers=json_access_token)
    assert res.status_code == 200


def test_school_id(client, json_access_token, school_json):
    res = client.post("/api/v1/schools", json=school_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.get("/api/v1/schools/1", headers=json_access_token)
    assert res.status_code == 200


def test_delete_school_id(client, json_access_token, school_json):
    res = client.post("/api/v1/schools", json=school_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.delete("/api/v1/schools/1", headers=json_access_token)
    assert res.status_code == 200


def test_create_update_school(client, json_access_token, school_json):
    res = client.post("/api/v1/schools", json=school_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.put("/api/v1/schools/1", json={
        "name": "No.(11)Nyanungdon",
        "contact_info": "098",
        "address_id": 1,
        "district": "yangon",
        "division": "yangon",
        "street_address": "18 street",
        "township": "MyaeNiGone",
        "type": "school"
    }, headers=json_access_token)
    assert res.status_code == 200

# End School #
# Start User #


def test_get_all_user(client, json_access_token):
    res = client.get("/api/v1/users", headers=json_access_token)
    assert res.status_code == 200
    res = client.get("/api/v1/users?role=admin", headers=json_access_token)
    assert res.status_code == 200
    res = client.get("/api/v1/users?role=user", headers=json_access_token)
    assert res.status_code == 400
    res = client.get("/api/v1/users?country=mm", headers=json_access_token)
    assert res.status_code == 200
    res = client.get("/api/v1/users?country=ja", headers=json_access_token)
    assert res.status_code == 200


def test_get_user_by_id(client, json_access_token):
    res = client.get("/api/v1/users/1", headers=json_access_token)
    assert res.status_code == 200


def test_put_user_by_id(client, json_access_token, user_json):
    res = client.post("/api/v1/users", json=user_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.put("/api/v1/users/1", json={
        "username": "test01",
        "display_name": "test01",
        "email": "test01@gmail.com",
        "password": "1234",
        "role": "admin",
        "country": "mm",
        "district": "pabedan",
        "division": "yangon",
        "street_address": "19 street",
        "township": "La Thar township"
    }, headers=json_access_token)
    assert res.status_code == 200


def test_delete_user_by_id(client, json_access_token, user_json, address_json):
    res = client.post("/api/v1/addresses", json=address_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.post("/api/v1/users", json=user_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.delete("/api/v1/users/1", headers=json_access_token)
    assert res.status_code == 200


def test_search_users(client, json_access_token):
    res = client.get("/api/v1/users/search?query=aa", headers=json_access_token)
    assert res.status_code == 200
    res = client.get("/api/v1/users/search?query=bb", headers=json_access_token)
    assert res.status_code == 200
    res = client.get("/api/v1/users/search?query=aa@gmail.com", headers=json_access_token)
    assert res.status_code == 200

# End User #

# Start Attendance #


def test_get_attendance(client, json_access_token):
    res = client.get("/api/v1/attendances", headers=json_access_token)
    assert res.status_code == 200
    res = client.get("/api/v1/attendances?page=2", headers=json_access_token)
    assert res.status_code == 200
    res = client.get("/api/v1/attendances?year=2020", headers=json_access_token)
    assert res.status_code == 200
    res = client.get("/api/v1/attendances?grade=G-10", headers=json_access_token)
    assert res.status_code == 200
    res = client.get("/api/v1/attendances?grade=G-10&year=2020", headers=json_access_token)
    assert res.status_code == 200


def test_post_attendance(client, json_access_token, school_json, attendance_json, student_json):
    """ this task will modify when student create API done"""
    # create school
    res = client.post("/api/v1/schools", json=school_json, headers=json_access_token)
    assert res.status_code == 200
    # create student
    res = client.post("/api/v1/students", json=student_json, headers=json_access_token)
    assert res.status_code == 200
    # create attendances
    res = client.post("/api/v1/attendances", json=attendance_json, headers=json_access_token)
    assert res.status_code == 200
    # update attendances
    res = client.put("/api/v1/attendances/1", json=attendance_json, headers=json_access_token)
    assert res.status_code == 200


def test_delete_attendance(client, json_access_token, school_json, attendance_json, student_json):
    """ this task will modify when student create API done"""
    # create school
    res = client.post("/api/v1/schools", json=school_json, headers=json_access_token)
    assert res.status_code == 200
    # create student
    res = client.post("/api/v1/students", json=student_json, headers=json_access_token)
    assert res.status_code == 200
    # create attendances
    res = client.post("/api/v1/attendances", json=attendance_json, headers=json_access_token)
    assert res.status_code == 200
    # update attendances
    res = client.delete("/api/v1/attendances/1", json=attendance_json, headers=json_access_token)
    assert res.status_code == 200

# End Attendance #
# Start Transfer #


def test_get_transfer_by_id(client, json_access_token, transfer_json):
    res = client.post("/api/v1/transfers", json=transfer_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.get("/api/v1/transfers/1", headers=json_access_token)
    assert res.status_code == 200


def test_get_all_transfer(client, json_access_token):
    res = client.get("/api/v1/transfers", headers=json_access_token)
    assert res.status_code == 200


def test_delete_transfer_by_id(client, json_access_token, transfer_json):
    res = client.post("/api/v1/transfers", json=transfer_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.delete("/api/v1/transfers/1", headers=json_access_token)
    assert res.status_code == 200


def test_create_update_transfer(client, json_access_token, transfer_json):
    res = client.post("/api/v1/transfers", json=transfer_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.put("/api/v1/transfers/1", json=transfer_json, headers=json_access_token)
    assert res.status_code == 200


# End Transfer #

# Start Student #


def test_student(client, json_access_token):
    res = client.get("/api/v1/students", headers=json_access_token)
    assert res.status_code == 200


def test_student_id(client, json_access_token, student_json):
    res = client.post("/api/v1/students", json=student_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.get("/api/v1/students/1", headers=json_access_token)
    assert res.status_code == 200


def test_delete_student_id(client, json_access_token, student_json):
    res = client.post("/api/v1/students", json=student_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.delete("/api/v1/students/1", headers=json_access_token)
    assert res.status_code == 200


def test_create_update_student(client, json_access_token, student_json):
    res = client.post("/api/v1/students", json=student_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.put("/api/v1/students/1", json={
        "district": "မရမ်းကုန်းမြို့နယ်",
        "division": "yangon",
        "street_address": "ဉီးဘအိုလမ်း",
        "township": "အမှတ်(၂)ရပ်ကွက်",
        "type": "student",
        "address_id": 1,
        "deactivated_at": "2020-07-26T03:37:05.836Z",
        "birth_date": "12-08-2006",
        "father_name": "ဉီးလှ",
        "mother_name": "ဒေါ်မြ",
        "name": "မောင်မောင်",
        "parents_occupation": "လယ်သမား",
        "photo": "https://i.pinimg.com/originals/a7/65/45/a7654580f501e9501e329978bebd051b.jpg"
    }, headers=json_access_token)
    assert res.status_code == 200

# End Transfer #

# Start Extra Fund #


def test_extra_fund_get_id(client, json_access_token, extra_fund_json, transfer_json):
    res = client.post("/api/v1/transfers", json=transfer_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.post("/api/v1/extra_funds", json=extra_fund_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.get("/api/v1/extra_funds/1", headers=json_access_token)
    assert res.status_code == 200


def test_get_all_extra_fund(client, json_access_token):
    res = client.get("/api/v1/extra_funds", headers=json_access_token)
    assert res.status_code == 200


def test_delete_extra_funds_by_id(client, json_access_token, transfer_json, extra_fund_json):
    res = client.post("/api/v1/transfers", json=transfer_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.post("/api/v1/extra_funds", json=extra_fund_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.delete("/api/v1/extra_funds/1", headers=json_access_token)
    assert res.status_code == 200


def test_create_update_extra_funds(client, json_access_token, extra_fund_json, transfer_json):
    res = client.post("/api/v1/transfers", json=transfer_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.post("/api/v1/extra_funds", json=extra_fund_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.put("/api/v1/extra_funds/1", json=extra_fund_json, headers=json_access_token)
    assert res.status_code == 200

# End Extra Fund #

# Start Donation #


def test_create_update_donation(client, json_access_token, donation_json,
                                transfer_json, school_json, student_json, attendance_json):
    res = client.post("/api/v1/transfers", json=transfer_json, headers=json_access_token)
    assert res.status_code == 200
    # create school
    res = client.post("/api/v1/schools", json=school_json, headers=json_access_token)
    assert res.status_code == 200
    # create student
    res = client.post("/api/v1/students", json=student_json, headers=json_access_token)
    assert res.status_code == 200
    # create attendances
    res = client.post("/api/v1/attendances", json=attendance_json, headers=json_access_token)
    assert res.status_code == 200
    # create donation
    res = client.post("/api/v1/donations", json=donation_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.put("/api/v1/donations/1", json=donation_json, headers=json_access_token)
    assert res.status_code == 200


def test_delete_donation(client, json_access_token, donation_json,
                                transfer_json, school_json, student_json, attendance_json):
    res = client.post("/api/v1/transfers", json=transfer_json, headers=json_access_token)
    assert res.status_code == 200
    # create school
    res = client.post("/api/v1/schools", json=school_json, headers=json_access_token)
    assert res.status_code == 200
    # create student
    res = client.post("/api/v1/students", json=student_json, headers=json_access_token)
    assert res.status_code == 200
    # create attendances
    res = client.post("/api/v1/attendances", json=attendance_json, headers=json_access_token)
    assert res.status_code == 200
    # create donation
    res = client.post("/api/v1/donations", json=donation_json, headers=json_access_token)
    assert res.status_code == 200
    res = client.delete("/api/v1/donations/1", json=donation_json, headers=json_access_token)
    assert res.status_code == 200


def test_divisions(client, json_access_token):
    res = client.get("/api/v1/myanmar_divisions", headers=json_access_token)
    assert res.status_code == 200


def test_donations(client, json_access_token):
    res = client.get("/api/v1/donations", headers=json_access_token)
    assert res.status_code == 200
# End Donation #
