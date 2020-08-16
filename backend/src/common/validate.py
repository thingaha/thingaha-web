from schema import SchemaError


class InputValidate:
    def __init__(self, schema: dict = None):
        self.schema = schema

    @staticmethod
    def validate_address(address: dict, schema: dict = None):
        """
        check valid address
        :param address:
        :param schema:
        :return:
        """
        try:
            return schema.validate(address)
        except SchemaError:
            return False

    @staticmethod
    def validate_school(school_info: dict, schema: dict = None):
        """
        check valid school info
        :param school_info:
        :param schema:
        :return:
        """
        print(type(schema), type(school_info))
        try:
            return schema.validate(school_info)
        except SchemaError as e:
            print(e)
            return False

