"""
database seeding for init db data
"""
import psycopg2

from common.config import load_config

CONF = load_config()

CONN = psycopg2.connect(host=CONF["postgres"]["host"], port=CONF["postgres"]["port"],
                        dbname=CONF["postgres"]["db"], user=CONF["postgres"]["user"],
                        password=CONF["postgres"]["password"])
CURSOR = CONN.cursor()

try:
    with open("../bin/db_seed/addresses.csv", "r", encoding="utf-8") as f:
        CURSOR.copy_from(f, "addresses", sep=",")
        CONN.commit()

    with open("../bin/db_seed/users.csv", "r", encoding="utf-8") as f:
        CURSOR.copy_from(f, "users", sep=",")
        CONN.commit()

    with open("../bin/db_seed/schools.csv", "r", encoding="utf-8") as f:
        CURSOR.copy_from(f, "schools", sep=",")
        CONN.commit()

    with open("../bin/db_seed/students.csv", "r", encoding="utf-8") as f:
        CURSOR.copy_from(f, "students", sep=",")
        CONN.commit()

    with open("../bin/db_seed/attendances.csv", "r", encoding="utf-8") as f:
        CURSOR.copy_from(f, "attendances", sep=",")
        CONN.commit()

    with open("../bin/db_seed/transfers.csv", "r", encoding="utf-8") as f:
        CURSOR.copy_from(f, "transfers", sep=",")
        CONN.commit()
    print("Input Sample Data Successfully")
except psycopg2.OperationalError as e:
    print("Data Seed Error: %s", e)

CURSOR.close()
CONN.close()
