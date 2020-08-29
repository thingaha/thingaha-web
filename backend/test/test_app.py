import os
import sys

import pytest

sys.path.append(os.path.join(os.path.dirname(__file__), "../src"))
from app import create_app, db


@pytest.fixture
def init_app():
    yield create_app()


@pytest.fixture
def client(init_app):
    with init_app.app_context():
        db.create_all()
    yield init_app.test_client()
    with init_app.app_context():
        db.drop_all()


def test_config(init_app):
    assert init_app.config["TESTING"] == True


def test_address_get_id(init_app, client):
    res = client.get("/api/v1/address/1")
    assert res.status_code == 200


def test_address_create_update(init_app, client):
    res = client.post("/api/v1/address", json={
        "district": "yangon",
        "division": "yangon",
        "street_address": "11 street",
        "township": "MyaeNiGone"
    })
    assert res.status_code == 200
    res = client.put("/api/v1/address/1", json={
        "district": "yangon",
        "division": "yangon",
        "street_address": "11 street",
        "township": "MyaeNiGone"
    })
    assert res.status_code == 200


def test_school(init_app, client):
    res = client.get("/api/v1/school")
    assert res.status_code == 200


def test_school_id(init_app, client):
    res = client.get("/api/v1/school/1")
    assert res.status_code == 200


def test_delete_school_id(init_app, client):
    res = client.delete("/api/v1/school/1")
    assert res.status_code == 200


def test_create_update_school(init_app, client):
    res = client.post("/api/v1/school", json={
        "school_name": "No.(35) Nyanungdon",
        "contact_info": "098",
        "district": "yangon",
        "division": "yangon",
        "street_address": "18 street",
        "township": "La Thar township"
    })
    assert res.status_code == 200
    res = client.put("/api/v1/school/1", json={
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
    res = client.get("/api/v1/user")
    assert res.status_code == 200


def test_user_by_id(init_app, client):
    res = client.get("/api/v1/user/1")
    assert res.status_code == 200
