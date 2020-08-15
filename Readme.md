# Thingaha Donation Project

**thingaha-web** is a web application to make life easier for thingaha donation group monthly donation data tracking and workflows.


### Backend

### Pre-requisite
1. Flask with python3
2. PostgreSQL == 12.3

### Environment setup
- install anaconda from [anaconda](https://docs.anaconda.com/anaconda/install/) webpage
- install [pgadmin4](https://www.pgadmin.org/download/) (optional)
- create the database with username,password in conf_dev, conf_test
##### create virtual environment 
```shell script
conda create -n <envname>
conda activate <envname>
pip install -r ~/thingaha/backend/requirements.txt
```
- DB migrate
```shell script
for linux -> go backend/bin and run -> ./db_migrate.sh
for windows -> go to backend\bin and run -> db_migrate.bat

#memo
postgres url be like [DB_TYPE]+[DB_CONNECTOR]://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DB_NAME]
```
- Start the server
```shell script
for linux -> go backend/bin and run -> ./start_app.sh
for windows -> go to backend\bin and run -> start_app.bat
```
- Start the test case
```shell script
for linux -> go backend/bin and run -> ./start_test.sh
for windows -> go to backend\bin and run -> start_test.bat
```
### Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Main UI framework is [Material UI](https://material-ui.com/). For component styling, [styled-components](https://styled-components.com/) is used.

### Pre-requisite

- [Recent version of Node.js](https://nodejs.org)
- [yarn](https://yarnpkg.com/)

