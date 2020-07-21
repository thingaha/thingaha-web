import os
import sys
from logging import getLogger, Formatter, StreamHandler, WARN, INFO, DEBUG
from logging.handlers import TimedRotatingFileHandler


def get_common_logger(name, log_level="DEBUG", log_file_path=None, std_out=True, when="D", interval=1, backup_count=180):
    """
    共通のloggerを作成する
    :param name:
    :param log_level:
    :param log_file_path:
    :param std_out:
    :param when:
    :param interval:
    :param backup_count:
    :return:
    """
    logger = getLogger(name)
    if log_level == "WARN":
        log_level = WARN
    elif log_level == "INFO":
        log_level = INFO
    else:
        log_level = DEBUG

    formatter = Formatter("%(asctime)s %(levelname)s %(module)s %(lineno)s :%(message)s")
    if log_file_path is not None:
        handler = TimedRotatingFileHandler(filename=log_file_path, when=when, interval=interval, backupCount=backup_count, encoding="utf-8")
        handler.setLevel(log_level)
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        handler.close()
    if std_out:
        handler = StreamHandler(sys.stdout)
        handler.setLevel(log_level)
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        handler.close()

    logger.setLevel(log_level)
    logger.propagate = False
    return logger


def set_logger(name: str, log_conf: dict):
    """
    set the logger for different usage
    :param name:
    :param log_conf:
    :return:
    """
    return get_common_logger(name, log_level=log_conf["level"],
                             log_file_path=os.path.dirname(__file__) + "/../.." + log_conf["log_file_path"],
                             std_out=log_conf["std_out"], when=log_conf["when"],
                             interval=log_conf["interval"], backup_count=log_conf["backupCount"])
