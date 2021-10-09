cd ..\src
set FLASK_APP=app.py
set FLASK_ENV=development
set SCRIPT_ENV=development
python db_seed.py
