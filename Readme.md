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
for linux, macOS -> go backend/bin and run -> ./db_migrate.sh
for windows -> go to backend\bin and run -> db_migrate.bat

#memo
postgres url be like [DB_TYPE]+[DB_CONNECTOR]://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DB_NAME]
```

- Start the server

```shell script
for linux, macOS -> go backend/bin and run -> ./start_app.sh
for windows -> go to backend\bin and run -> start_app.bat
```

- Start using API
```
- Import user table from the record file bin/user_init.
- Default server port is 5000: 
- All API required JWT token for access data 
- Get the access token from login. 
    -- init user_email: moemoe@gmail.com
    -- init user_pass: 123
    -- login URL : => 
        -- [POST] http://localhost:5000/api/v1/login
- API docs can be found in https://github.com/thingaha/thingaha-web/tree/master/backend/docs
```

- Start the test case

```shell script
for linux, macOS -> go backend/bin and run -> ./start_test.sh
for windows -> go to backend\bin and run -> start_test.bat
```




### Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Main UI framework is [Material UI](https://material-ui.com/). For component styling, [styled-components](https://styled-components.com/) is used.

#### Pre-requisite

- [Recent version of Node.js](https://nodejs.org)
- [yarn](https://yarnpkg.com/)

#### Getting Started

- First, install tools listed in pre-requisite section.
- Then, set up the draft api server. **We're using a draft api server with canned response before backend is ready**
  - To set up draft api server, `cd` into the `draft_server` directory and install necessary node modules by running `yarn install`.
  - Then, run `yarn start`
  - The draft server is configured to run on port `9000`. Try navigating to [http://localhost:9000/users](http://localhost:9000/users) to see if draft server is working properly.
- Then set up the frontend app.
  - To set up frontend dev server, `cd` into the `frontend` directory and install necessary node modules by running `yarn install`.
  - Then, run `yarn start`
  - The frontend dev server is configured to run on port `5001`. Try navigating to [http://localhost:5001/](http://localhost:5001/) to see the app in action.
