"""
Custom Error Module for thingaha API
Each error has
Error Code : EXXXX
reason: "Custom Reason"
description: "Error Description"
"""


class Error(Exception):
    """Base class for other exceptions"""
    def __init__(self, description):
        super().__init__()
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
        super().__init__(description)
        self.error_code = "E0002"
        self.reason = "404 ERROR"


class RequestDataEmpty(Error):
    """Raised Empty Request data when DB error"""

    def __init__(self, description):
        """
        Empty Request error
        :param description:
        """
        super().__init__(description)
        self.error_code = "E0003"
        self.reason = "Request Json is empty"


class ValidateFail(Error):
    """Raised Validate data when doing action"""
    def __init__(self, description):
        """
        Validate error
        :param description:
        """
        super().__init__(description)
        self.error_code = "E0004"
        self.reason = "Validation Fail"


class FileNotFound(Error):
    """Raised custom FileNotFound"""
    def __init__(self, description):
        """
        Validate error
        :param description:
        """
        super().__init__(description)
        self.error_code = "E0005"
        self.reason = "File not found"
