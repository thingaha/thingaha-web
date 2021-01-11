"""
request body validate module
"""
from schema import SchemaError
from common.logger import get_common_logger


class InputValidate:
    """
    input validate with schema
    """
    def __init__(self, schema: dict = None):
        self.schema = schema

    @staticmethod
    def validate_json(data: dict, schema=None):
        """
        validate info
        :param data:
        :param schema:
        :return:
        """
        try:
            return schema.validate(data)
        except SchemaError as error:
            logger = get_common_logger(__name__)
            logger.error("Schema Error %s", error)
            return False
