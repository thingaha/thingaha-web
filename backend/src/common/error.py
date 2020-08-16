class Error(Exception):
    """Base class for other exceptions"""
    pass


class SQLCustomError(Error):
    """Raised SQLAlchemyError when DB error"""

    def __init__(self, description):
        """
        SQL custom error
        :param description:
        """
        self.error_code = "E0001"
        self.reason = "DB Error"
        self.description = description


class PageNotFoundError(Error):
    """Raised PageNotFoundError when DB error"""

    def __init__(self, description):
        """
        SQL custom error
        :param description:
        """
        self.error_code = "E0002"
        self.reason = "404 ERROR"
        self.description = description


class RequestDataEmpty(Error):
    """Raised Empty Request data when DB error"""

    def __init__(self, description):
        """
        SQL custom error
        :param description:
        """
        self.error_code = "E0003"
        self.reason = "Request Json is empty"
        self.description = description


class ValidateFail(Error):
    """Raised Validate data when doing action"""
    def __init__(self, description):
        """
        SQL custom error
        :param description:
        """
        self.error_code = "E0004"
        self.reason = "Validation Fail"
        self.description = description
