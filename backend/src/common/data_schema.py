"""
schema module for request body
use python library Schema
"""
from schema import Schema

address_schema = Schema({
    "division": str,
    "district": str,
    "township": str,
    "street_address": str,
    "type": str
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
    "country": str,
    "donation_active": bool
})

attendance_schema = Schema({
    "student_id": int,
    "school_id": int,
    "grade": str,
    "year": str,
    "enrolled_date": str
})

<<<<<<< Updated upstream
=======

extrafunds_schema = Schema({
    "mmk_amount": int,
    "transfer_id": int
})
>>>>>>> Stashed changes
transfer_schema = Schema({
    "year": int,
    "month": str,
    "total_mmk": int,
    "total_jpy": int
})
