"""
request body validate module
"""
from schema import SchemaError


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
        except SchemaError:
            return False
