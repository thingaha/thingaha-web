#!/bin/sh

export FLASK_ENV=test
export SCRIPT_ENV=test
python ../test/test_app.py
