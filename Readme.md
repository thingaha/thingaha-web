# Thingaha Donation Project

thingaha-web is a web application to make life easier for thingaha donation group monthly donation data tracking and workflows.


### Backend

### Pre-requisite
1. Flask with python3
2. PostgreSQL == 12.3cd

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

### Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Main UI framework is [Material UI](https://material-ui.com/). For component styling, [styled-components](https://styled-components.com/) is used.

### Pre-requisite

- [Recent version of Node.js](https://nodejs.org)
- [yarn](https://yarnpkg.com/)

