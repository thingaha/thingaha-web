import logging.config
import os

import yaml
from flask import Flask

from common.config import load_config
from common.postgre_client import PostgreClient

app = Flask(__name__)

app.config["JSON_AS_ASCII"] = False
app.config["SECRET_KEY"] = os.urandom(12).hex()


conf = load_config()
with open("../conf/%s" % conf["common"]["log"]["conf"], "r", encoding="utf-8") as log_conf_f:
    logging.config.dictConfig(yaml.safe_load(log_conf_f))

postgre_client = PostgreClient(conf, app.logger)

if __name__ == "__main__":
    try:
        app.run(host=conf["common"]["server"]["host"], port=conf["common"]["server"]["port"], threaded=True)
    finally:
        postgre_client.connection.close()
