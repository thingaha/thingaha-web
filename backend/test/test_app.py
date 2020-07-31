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


def test_index(init_app, client):
    res = client.get('/api/v1/address')
    assert res.status_code == 200
