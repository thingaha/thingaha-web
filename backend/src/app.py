from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

from common.config import load_config, load_logging_conf, Config
from controller import api
from database import db, SQLALCHEMY_DATABASE_URI


def create_app():
    app = Flask(__name__)
    app.config.update(SQLALCHEMY_DATABASE_URI=SQLALCHEMY_DATABASE_URI)
    CORS(app)
    app.config.from_object(Config)
    db.init_app(app)
    Migrate(app, db, compare_type=True)
    from models import user, student, school, address, transfer, attendance, donation, extrafund
    app.register_blueprint(api.api)
    return app


conf = load_config()
load_logging_conf(conf["common"]["log"]["conf"])
division_file_path = conf["common"]["mm_division"]["file_path"]

app = create_app()
jwt = JWTManager(app)

api.jwt = jwt
api.division_file_path = division_file_path


@jwt.user_claims_loader
def add_claims_to_access_token(user):
    return user.role


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.name


if __name__ == "__main__":
    try:
        app.run(host=conf["common"]["server"]["host"], port=conf["common"]["server"]["port"], threaded=True, debug=True)
    finally:
        pass
