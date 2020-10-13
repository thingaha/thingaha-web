"""
schema module for request body
use python library Schema
"""
from schema import Schema

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

attendance_schema = Schema({
    "student_id": int,
    "school_id": int,
    "grade": str,
    "year": str,
    "enrolled_date": str
})

donation_schema = Schema({
    "user_id": int,
    "attendance_id": int,
    "transfer_id": int,
    "year": int,
    "month": str,
    "mmk_amount": float,
    "jpy_amount": float,
    "paid_at": str
})
