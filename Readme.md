# Thingaha Donation Project

**thingaha-web** is a web application to make life easier for thingaha donation group monthly donation data tracking and workflows.

### Backend

### Pre-requisite

1. Flask with python3
2. PostgreSQL == 12.3

### Environment setup

- install anaconda from [anaconda](https://docs.anaconda.com/anaconda/install/) webpage
- install [pgadmin4](https://www.pgadmin.org/download/) (optional)

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

### Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Main UI framework is [Material UI](https://material-ui.com/). For component styling, [styled-components](https://styled-components.com/) is used.

#### Pre-requisite

- [Recent version of Node.js](https://nodejs.org)
- [yarn](https://yarnpkg.com/)

#### Getting Started

- First, install tools listed in pre-requisite section.
- Then, set up the draft api server. ** We're using a draft api server with canned response before backend is ready **
  - To set up draft api server, `cd` into the `draft_server` directory and install necessary node modules by running `yarn install`.
  - Then, run `yarn start`
  - The draft server is configured to run on port `9000`. Try navigating to [http://localhost:9000/users](http://localhost:9000/users) to see if it's working properly.
- Then set up the frontend app.
  - To set up draft api server, `cd` into the `frontend` directory and install necessary node modules by running `yarn install`.
  - Then, run `yarn start`
  - The frontend dev server is configured to run on port `5001`.
