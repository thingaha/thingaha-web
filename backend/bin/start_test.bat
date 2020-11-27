set FLASK_ENV=test
set SCRIPT_ENV=test
pytest ..\test\test_app.py
pytest ..\test\test_sub_admin.py
pytest ..\test\test_donator.py
