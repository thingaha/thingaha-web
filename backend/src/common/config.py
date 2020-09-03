"""
app start config module
include logging conf , app config and db config
"""
import os
from logging import config

import yaml

from common.error import FileNotFound

current_dir = os.path.join(os.path.dirname(__file__), "../../conf/")


def load_logging_conf(log_file_path: str):
    """
    load logging conf for app
    :param log_file_path:
    :return:
    """
    try:
        with open(current_dir + "{}".format(log_file_path), "r", encoding="utf-8") as log_conf_f:
            config.dictConfig(yaml.safe_load(log_conf_f))
    except FileNotFoundError:
        raise FileNotFound("loading log conf load error")


def load_config() -> dict:
    """
    load conf based on environment
    :return:
    """
    env = "dev"
    if os.environ.get("SCRIPT_ENV") == "production":
        env = "prod"
    elif os.environ.get("SCRIPT_ENV") == "staging":
        env = "staging"
    elif os.environ.get("SCRIPT_ENV") == "test":
        env = "test"
    try:
        with open(current_dir + "config_{}.yaml".format(env), "r", encoding="utf-8") as conf_f:
            conf = yaml.safe_load(conf_f)
        return conf
    except FileNotFoundError:
        raise FileNotFound("app conf load error")


class Config(object):
    """set app config in here"""
    SECRET_KEY = os.environ.get("SECRET_KEY") or os.urandom(12).hex()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JSON_AS_ASCII = False
    SQLALCHEMY_ECHO = False
    CORS_HEADERS = "Content-Type"
    if os.environ.get("SCRIPT_ENV") == "test":
        TESTING = True
        DEBUG = True
