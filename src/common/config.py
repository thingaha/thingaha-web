import os

import yaml


def load_config(basedir: str) -> dict:
    """
    load conf based on environment
    :return:
    """
    env = "dev"
    if os.environ.get("SCRIPT_ENV") == "production":
        env = "prod"
    elif os.environ.get("SCRIPT_ENV") == "staging":
        env = "staging"
    with open(basedir + "/../conf/config_%s.yaml" % env, "r", encoding="utf-8") as conf_f:
        conf = yaml.safe_load(conf_f)
    return conf


class Config(object):
    SECRET_KEY = os.environ.get("SECRET_KEY") or os.urandom(12).hex()
    SQLALCHEMY_DATABASE_URI = os.environ.get("SQLALCHEMY_DATABASE_URI") or "postgresql://postgres:thingaha@localhost:5432/thingaha_dev"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JSON_AS_ASCII = False
    SQLALCHEMY_ECHO = False
