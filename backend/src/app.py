from flask import Flask
from flask_migrate import Migrate

from common.config import Config
from common.config import load_config
from controller import api
from database import db, SQLALCHEMY_DATABASE_URI


def create_app():
    app = Flask(__name__)
    app.config.update(SQLALCHEMY_DATABASE_URI=SQLALCHEMY_DATABASE_URI)
    app.config.from_object(Config)
    db.init_app(app)
    Migrate(app, db)
    from models import user, student, school, address, transfer, attendance, donation, extrafund
    app.register_blueprint(api.api)
    return app


conf = load_config()

if __name__ == "__main__":
    try:
        app = create_app()
        app.run(host=conf["common"]["server"]["host"], port=conf["common"]["server"]["port"], threaded=True, debug=True)
    finally:
        pass
