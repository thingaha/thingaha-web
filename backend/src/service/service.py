"""service class for CRUD actions"""

from common.helper import ThingahaHelper
from common.logger import get_common_logger
from common.validate import InputValidate


class Service:
    """
    Parent Service Class for CRUD actions
    """
    def __init__(self, logger=None) -> None:
        if logger is None:
            logger = get_common_logger(__name__)
        self.logger = logger
        self.input_validate = InputValidate
        self.thingaha_helper = ThingahaHelper(logger)
