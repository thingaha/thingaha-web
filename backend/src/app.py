from flask import Flask
from flask_migrate import Migrate

from common.config import Config
from common.config import load_config
from controller import api
from database import db, SQLALCHEMY_DATABASE_URI
from service.user.user_service import UserService
from service.school.school_service import SchoolService
from service.address.address_service import AddressService
from flask_cors import CORS, cross_origin


def create_app():
    app = Flask(__name__)
    app.config.update(SQLALCHEMY_DATABASE_URI=SQLALCHEMY_DATABASE_URI)
    cors = CORS(app)
    app.config.from_object(Config)
    db.init_app(app)
    Migrate(app, db)
    from models import user, student, school, address, transfer, attendance, donation, extrafund
    app.register_blueprint(api.api)
    return app


conf = load_config()
app = create_app()
user_service = UserService(app.logger)
school_service = SchoolService(app.logger)
address_service = AddressService(app.logger)

api.user_service = user_service
api.school_service = school_service
api.address_service = address_service


if __name__ == "__main__":
    try:
        app.run(host=conf["common"]["server"]["host"], port=conf["common"]["server"]["port"], threaded=True, debug=True)
    finally:
        pass
