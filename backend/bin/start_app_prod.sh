#!/bin/sh

export S3_BUCKET=XXX
export S3_KEY=XXX
export S3_SECRET_ACCESS_KEY=XXX
export JWT_SECRET_KEY=super-secret
export FLASK_ENV=production
export SCRIPT_ENV=production
python ../src/app.py
