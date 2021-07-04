cd ../src
set FLASK_APP=app.py
export FLASK_ENV=production
export SCRIPT_ENV=production
python db_seed.py
