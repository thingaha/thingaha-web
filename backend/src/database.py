"""
database init and db config
"""
from flask_sqlalchemy import SQLAlchemy

from common.config import load_config

conf = load_config()

db = SQLAlchemy()

SQLALCHEMY_DATABASE_URI = "{}{}:{}@{}:{}/{}".format(
    conf["postgres"]["url"], conf["postgres"]["user"],
    conf["postgres"]["password"], conf["postgres"]["host"],
    conf["postgres"]["port"], conf["postgres"]["db"]
)
