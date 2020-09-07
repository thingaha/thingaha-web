import os
import sys

import pytest
from flask_jwt_extended import create_access_token, JWTManager

sys.path.append(os.path.join(os.path.dirname(__file__), "../src"))
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
        access_token = create_access_token(identity="aa@gmail.com")
        return {
            "access_token": access_token
        }


def test_config(init_app):
    assert init_app.config["TESTING"] == True


def test_address_get_id(init_app, client, json_access_token):
    res = client.get("/api/v1/addresses/1", headers=json_access_token)
    assert res.status_code == 200


def test_address_create_update(init_app, client):
    res = client.post("/api/v1/addresses", json={
        "district": "yangon",
        "division": "yangon",
        "street_address": "11 street",
        "township": "MyaeNiGone"
    })
    assert res.status_code == 200
    res = client.put("/api/v1/addresses/1", json={
        "district": "yangon",
        "division": "yangon",
        "street_address": "11 street",
        "township": "MyaeNiGone"
    })
    assert res.status_code == 200


def test_school(init_app, client):
    res = client.get("/api/v1/schools")
    assert res.status_code == 200


def test_school_id(init_app, client):
    res = client.get("/api/v1/schools/1")
    assert res.status_code == 200


def test_delete_school_id(init_app, client):
    res = client.delete("/api/v1/schools/1")
    assert res.status_code == 200


def test_create_update_school(init_app, client):
    res = client.post("/api/v1/schools", json={
        "school_name": "No.(35) Nyanungdon",
        "contact_info": "098",
        "district": "yangon",
        "division": "yangon",
        "street_address": "18 street",
        "township": "La Thar township"
    })
    assert res.status_code == 200
    res = client.put("/api/v1/schools/1", json={
        "school_name": "No.(11)Nyanungdon",
        "contact_info": "098",
        "address_id": 1,
        "district": "yangon",
        "division": "yangon",
        "street_address": "18 street",
        "township": "MyaeNiGone"
    })
    assert res.status_code == 200


def test_user(init_app, client):
    res = client.get("/api/v1/users")
    assert res.status_code == 200


def test_user_by_id(init_app, client):
    res = client.get("/api/v1/users/1")
    assert res.status_code == 200
