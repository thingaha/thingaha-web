#!/bin/sh

export FLASK_ENV=test
export SCRIPT_ENV=test
pytest ../test/test_app.py
