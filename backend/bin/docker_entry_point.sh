#!/bin/sh
cd ../src

flask db stamp head
flask db migrate
flask db upgrade

python3 ./app.py
