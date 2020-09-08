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
    JWTManager(app)
    yield app


@pytest.fixture
def client(init_app):
    with init_app.app_context():
        db.create_all()
    yield init_app.test_client()
    with init_app.app_context():
        db.drop_all()


@pytest.fixture
def json_access_token(init_app, client):
    with init_app.app_context():
        address_id = AddressModel.create_address(AddressModel(
            division="yangon",
            district="aa",
            township="aa",
            street_address="aa"))
        UserModel.create_user(UserModel(
            name="aa",
            email="aa@gmail.com",
            address_id=address_id,
            hashed_password="pass",
            role="admin",
            country="mm"))
        access_token = create_access_token(identity="aa@gmail.com", expires_delta=timedelta(days=1))
        return {
            "Authorization": "Bearer " + access_token,
            "Content-Type": "application/json"
        }


def test_config(init_app):
    assert init_app.config["TESTING"] == True


def test_address_get_id(init_app, client, json_access_token):
    with init_app.app_context():
        res = client.get("/api/v1/addresses/1", headers=json_access_token)
        assert res.status_code == 200


def test_address_create_update(init_app, client, json_access_token):
    res = client.post("/api/v1/addresses", json={
        "district": "yangon",
        "division": "yangon",
        "street_address": "11 street",
        "township": "MyaeNiGone"
    }, headers=json_access_token)
    assert res.status_code == 200
    res = client.put("/api/v1/addresses/1", json={
        "district": "yangon",
        "division": "yangon",
        "street_address": "11 street",
        "township": "MyaeNiGone"
    }, headers=json_access_token)
    assert res.status_code == 200


def test_school(init_app, client, json_access_token):
    res = client.get("/api/v1/schools", headers=json_access_token)
    assert res.status_code == 200


def test_school_id(init_app, client, json_access_token):
    res = client.get("/api/v1/schools/1", headers=json_access_token)
    assert res.status_code == 200


def test_delete_school_id(init_app, client, json_access_token):
    res = client.delete("/api/v1/schools/1", headers=json_access_token)
    assert res.status_code == 200


def test_create_update_school(init_app, client, json_access_token):
    res = client.post("/api/v1/schools", json={
        "school_name": "No.(35) Nyanungdon",
        "contact_info": "098",
        "district": "yangon",
        "division": "yangon",
        "street_address": "18 street",
        "township": "La Thar township"
    }, headers=json_access_token)
    assert res.status_code == 200
    res = client.put("/api/v1/schools/1", json={
        "school_name": "No.(11)Nyanungdon",
        "contact_info": "098",
        "address_id": 1,
        "district": "yangon",
        "division": "yangon",
        "street_address": "18 street",
        "township": "MyaeNiGone"
    }, headers=json_access_token)
    assert res.status_code == 200


def test_user(init_app, client, json_access_token):
    res = client.get("/api/v1/users", headers=json_access_token)
    assert res.status_code == 200


def test_user_by_id(init_app, client, json_access_token):
    res = client.get("/api/v1/users/1", headers=json_access_token)
    assert res.status_code == 200
