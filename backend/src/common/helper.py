from datetime import date, datetime

from common.logger import get_common_logger
from typing import Optional


class ThingahaHelper:
    """
    Helper class for thingaha custom format
    """
    def __init__(self, logger=None) -> None:
        if logger is None:
            logger = get_common_logger(__name__)
        self.logger = logger
        self.date_format = "%Y-%m-%d"
        self.date_time_format = "%Y-%m-%d %H:%M:%S"

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

    @staticmethod
    def standardize_date(input_date: date) -> Optional[str]:
        """
        standardize date for API
        :param input_date:
        :return:
        """
        if input_date and isinstance(input_date, date):
            return input_date.strftime("%Y-%m-%d")
        return None

    def standardize_str_to_date(self, input_date: str) -> Optional[datetime]:
        """
        standardize date for API
        :param input_date:
        :return:
        """
        try:
            return datetime.strptime(input_date, self.date_format)
        except ValueError:
            self.logger.warning(f"Date time format error: {input_date}")

    def get_now(self) -> str:
        """
        return current time
        :return:
        """
        return datetime.now().strftime(self.date_time_format)
