import psycopg2

from common.logger import get_common_logger


class PostgreClient:
    def __init__(self, conf: dict, logger=None):
        self.connection = psycopg2.connect(user=conf["postgre"]["user"],
                                      password=conf["postgre"]["password"],
                                      host=conf["postgre"]["host"],
                                      port=conf["postgre"]["port"],
                                      dbname=conf["postgre"]["db"])
        if logger is None:
            logger = get_common_logger(__name__)
        self.logger = logger

    def check_connection(self):
        """
        check postgres SQl parameter
        :return:
        """
        cursor = self.connection.cursor()
        # self.logger.info(self.connection.get_dsn_parameters())
        try:
            cursor.execute("SELECT version();")
            record = cursor.fetchone()
            self.logger.info("Connected to - ", record)
        except (Exception, psycopg2.Error) as error:
            self.logger.error("Error while connecting to PostgreSQL", error)
        finally:
            self.connection.close()
            cursor.close()
            self.logger.info("PostgreSQL connection is closed")
