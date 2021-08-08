#!/bin/sh

export S3_BUCKET=XXX
export AWS_ACCESS_KEY_ID=XXX
export AWS_SECRET_ACCESS_KEY_ACCESS_KEY=XXX
export JWT_SECRET_KEY=super-secret
export FLASK_ENV=development
export SCRIPT_ENV=development
python ../src/app.py
