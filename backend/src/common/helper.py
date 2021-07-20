from common.logger import get_common_logger


class ThingahaHelper:
    """
    Helper class for thingaha custom format
    """
    def __init__(self, logger=None) -> None:
        if logger is None:
            logger = get_common_logger(__name__)
        self.logger = logger

    @staticmethod
    def parse_address_data(data: dict) -> dict:
        """
        create address format to readable format
        @param data:
        @type data:
        @return:
        @rtype:
        """
        return {k: data[f"address[{k}]"] for k in ["division", "district", "township", "street_address"]}
