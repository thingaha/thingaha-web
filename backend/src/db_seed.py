"""
database seeding for init db data
"""
import csv

import psycopg2

from common.config import load_config

CONF = load_config()


CONN = psycopg2.connect(host=CONF["postgres"]["host"], port=CONF["postgres"]["port"],
                        dbname=CONF["postgres"]["db"], user=CONF["postgres"]["user"],
                        password=CONF["postgres"]["password"])
CURSOR = CONN.cursor()


def read_and_insert_data(file_path: str, table_name: str):
    """
    read the csv file and insert data
    """
    with open(file_path, "r", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            CURSOR.execute(insert_data_to_table(table_name, row))
        CONN.commit()


def insert_data_to_table(table_name: str, datas: dict) -> str:
    """
    :params: table_name
    :params: datas (read data)
    helper function for data insert
    """
    return "INSERT INTO " + table_name + "(" + ",".join(datas.keys()) + ") VALUES (" + ",".join(datas.values()) + ")"


try:
    read_and_insert_data("../bin/db_seed/addresses.csv", "ADDRESSES")
    read_and_insert_data("../bin/db_seed/users.csv", "USERS")
    read_and_insert_data("../bin/db_seed/schools.csv", "SCHOOLS")
    read_and_insert_data("../bin/db_seed/students.csv", "STUDENTS")
    read_and_insert_data("../bin/db_seed/attendances.csv", "ATTENDANCES")
    read_and_insert_data("../bin/db_seed/transfers.csv", "TRANSFERS")
    read_and_insert_data("../bin/db_seed/donations.csv", "DONATIONS")
    read_and_insert_data("../bin/db_seed/extrafunds.csv", "EXTRAFUNDS")

    print("Input Sample Data Successfully")
except (psycopg2.OperationalError, FileNotFoundError) as e:
    print("Data Seed Error: %s", e)

CURSOR.close()
CONN.close()
