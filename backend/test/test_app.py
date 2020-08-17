import os
import sys

import pytest

sys.path.append(os.path.join(os.path.dirname(__file__), "../src"))

from app import create_app


@pytest.fixture()
def init_app():
    yield create_app()


@pytest.fixture
def client(init_app):
    return init_app.test_client()


def test_config(init_app):
    assert init_app.config["TESTING"] == True


def test_address(init_app, client):
    res = client.get("/api/v1/address")
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


def test_update_school_id(init_app, client):
    res = client.put("/api/v1/school/1", json={
        "school_name": "No.(33)Nyanungdon",
        "contact_info": "098",
        "address_id": 4
    })
    assert res.status_code == 200
