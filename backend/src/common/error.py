class Error(Exception):
    """Base class for other exceptions"""
    def __init__(self, description):
        self.description = description


class SQLCustomError(Error):
    """Raised SQLAlchemyError when DB error"""

    def __init__(self, description):
        """
        SQL custom error
        :param description:
        """
        super().__init__(description)
        self.error_code = "E0001"
        self.reason = "DB Error"


class PageNotFoundError(Error):
    """Raised PageNotFoundError when DB error"""

    def __init__(self, description):
        """
        PageNotFoundError
        :param description:
        """
        self.error_code = "E0002"
        self.reason = "404 ERROR"
        super().__init__(description)


class RequestDataEmpty(Error):
    """Raised Empty Request data when DB error"""

    def __init__(self, description):
        """
        Empty Request error
        :param description:
        """
        self.error_code = "E0003"
        self.reason = "Request Json is empty"
        self.description = description


class ValidateFail(Error):
    """Raised Validate data when doing action"""
    def __init__(self, description):
        """
        Validate error
        :param description:
        """
        self.error_code = "E0004"
        self.reason = "Validation Fail"
        super().__init__(description)
