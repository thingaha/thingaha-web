import logging.config
import os

import yaml


def load_logging_conf(log_conf: dict):
    """
    load logging conf for app
    :param log_conf:
    :return:
    """
    try:
        with open("../conf/%s" % log_conf["common"]["log"]["conf"], "r", encoding="utf-8") as log_conf_f:
            logging.config.dictConfig(yaml.safe_load(log_conf_f))
    except FileNotFoundError:
        raise Exception("loading log conf load error")


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
    try:
        with open("../conf/config_%s.yaml" % env, "r", encoding="utf-8") as conf_f:
            conf = yaml.safe_load(conf_f)
        return conf
    except FileNotFoundError:
        raise Exception("logging app conf load error")


class Config(object):
    """set app config in here"""
    SECRET_KEY = os.environ.get("SECRET_KEY") or os.urandom(12).hex()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JSON_AS_ASCII = False
    SQLALCHEMY_ECHO = False


