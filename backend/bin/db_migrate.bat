cd ..\src
set FLASK_APP=app.py
flask db migrate
flask db upgrade
