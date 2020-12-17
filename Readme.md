# Thingaha Donation Project

**thingaha-web** is a web application to make life easier for thingaha donation group monthly donation data tracking and workflows.

For project background and current goals for v1.0, please read the [Wiki Home Page](https://github.com/thingaha/thingaha-web/wiki).

### Backend

### Pre-requisite

1. Flask with python3
2. [PostgreSQL](https://www.postgresql.org/download/) == 12.3

### Environment setup

#### Docker based setup

- Install Docker Engine from [Docker Official Site](https://docs.docker.com/engine/install/)
- Setup docker containers

  - cd into the `backend` directory and run `docker-compose up`. (Note: all the following commands assume we're in `backend` directory as working directory)
  - it should create `backend_web_1` container and `backend_db_1` containers.
  - you can check using `docker ps` command for 2 containers.
  - Then, optionally, seed database using the following command:
    `docker exec backend_web_1 /usr/bin/python3 ../src/db_seed.py`
  - You should be able to go to `http://localhost:5000/api/v1/users` and should see a json error message.

  For backend developers, who want to use docker for backend development, please refer to the following commands:

  - If there is any change in `requirements.txt`, we will need to rebuild the containers. To rebuild containers, we use:
    `docker-compose build` command.

#### Native env setup using Anaconda

- Install anaconda from [anaconda](https://docs.anaconda.com/anaconda/install/) webpage
- Install [pgadmin4](https://www.pgadmin.org/download/) (optional)
- Install PostgreSQL database server. We use [PostgreSQL Official Site](https://www.postgresql.org/download/) to install it. But, please free to use any custom installation method.
  - Create a database named `thingaha_dev` (You can give any name you want but you need to update the configuration files in `backend/conf` directory if you use a different database name.)
  - Update username and password in `backend/conf/config_dev.yaml` and `backend/conf/conf_test.yaml` files with the credentials you used to install the database.

##### Create virtual environment

```shell script
conda create -n <envname>
conda activate <envname>
pip install -r ~/thingaha/backend/requirements.txt
```

- DB migrate

create table and insert data to table
```shell script
for linux, macOS -> go backend/bin and run -> ./db_migrate.sh
for windows -> go to backend\bin and run -> db_migrate.bat


#memo
postgres url be like [DB_TYPE]+[DB_CONNECTOR]://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DB_NAME]
```


- ERD Diagram for Thingaha Project

![alt text](https://thingaha.drawerd.com/projects/602/render_svg?share_key=81bba674955bdb98666dc6a685de3f)

- Start the server

```shell script
for linux, macOS -> go backend/bin and run -> ./start_app.sh
for windows -> go to backend\bin and run -> start_app.bat
```

- Start using API

```
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

- For the [Postman](https://www.postman.com/) user,
  please import **_bin/db_seed/thingaha.postman_collection.json_** for API testing

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
  - To set up for windows developmemt, please update frontend\package.json
    - `"start": "PORT=5001 react-scripts start"` to `"start": "set PORT=5001 && react-scripts start"`
  - The frontend dev server is configured to run on port `5001`. Try navigating to [http://localhost:5001/](http://localhost:5001/) to see the app in action.

  - initial login information
    - username: `moemoe@gmail.com`
    - password: `123`
