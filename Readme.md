## Thingaha Donation Project 

1. Flask with python3
2. PostgreSQL == 12.3

### Environment setup
- install anaconda via anacoda webpage
-  create virtual environment 
```buildoutcfg
conda create -n <envname>
conda activate <envname>
pip install -r requirements.txt
```
- DB migrate
```buildoutcfg
set FLASK_APP=app.py
flask db migrate
flask db upgrade
#memo
postgres url be like [DB_TYPE]+[DB_CONNECTOR]://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DB_NAME]
```
- Start the server
```buildoutcfg
for linux -> move to bin and run -> ./start_app.sh
for windows -> move to bin and run -> start_app.bat
```

