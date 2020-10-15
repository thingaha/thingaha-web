#!/bin/sh
cd ../src

set FLASK_APP=app.py
flask db stamp head
flask db migrate
flask db upgrade

python3 ./app.py
