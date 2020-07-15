import logging.config
import os

import yaml
from flask import Flask
from flask_migrate import Migrate

from common.config import Config
from common.config import load_config
from controller import users_controller
from database import db


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    Migrate(app, db)
    app.register_blueprint(users_controller.user)
    return app


basedir = os.path.abspath(os.path.dirname(__file__))
conf = load_config(basedir)
with open("../conf/%s" % conf["common"]["log"]["conf"], "r", encoding="utf-8") as log_conf_f:
    logging.config.dictConfig(yaml.safe_load(log_conf_f))


if __name__ == "__main__":
    try:
        app = create_app()
        app.run(host=conf["common"]["server"]["host"], port=conf["common"]["server"]["port"], threaded=True, debug=True)
    finally:
        pass
