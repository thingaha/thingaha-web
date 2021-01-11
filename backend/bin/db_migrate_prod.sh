cd ../src
set FLASK_APP=app.py
export FLASK_ENV=production
export SCRIPT_ENV=production
flask db migrate
flask db upgrade
python db_seed.py
