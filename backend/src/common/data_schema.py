from schema import Schema
from datetime import datetime, date

address_schema = Schema({
    "division": str,
    "district": str,
    "township": str,
    "street_address": str
})

school_schema = Schema({
    "school_name": str,
    "contact_info": str,
    "address_id": int
})

user_schema = Schema({
    "name": str,
    "email": str,
    "address_id": int,
    "password": str,
    "role": str,
    "country": str
})

student_schema = Schema({
    "name": str,
    "deactivated_at": datetime,
    "birth_date": date,
    "father_name": str,
    "mother_name": str,
    "parents_occupation": str,
    "address_id": int
})
