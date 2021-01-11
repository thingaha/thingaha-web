"""
schema module for request body
use python library Schema
"""
from schema import Schema, Or, Regex

address_schema = Schema({
    "division": str,
    "district": str,
    "township": str,
    "street_address": str,
    "type": str
})

school_schema = Schema({
    "name": str,
    "contact_info": str,
    "address_id": Or(None, int)
})

user_schema = Schema({
    "username": Regex("^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"),
    "display_name": str,
    "email": str,
    "address_id": Or(None, int),
    "password": str,
    "role": str,
    "country": str,
    "donation_active": bool
})

user_update_schema = Schema({
    "username": str,
    "display_name": str,
    "email": str,
    "role": str,
    "address_id": Or(None, int),
    "country": str,
    "donation_active": bool
})

password_reset_schema = Schema({
    "user_id": int,
    "password": str
})

password_change_schema = Schema({
    "current_password": str,
    "new_password": str,
    "new_confirm_password": str
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
    "paid_at": Or(None, str)
})

extra_funds_schema = Schema({
    "mmk_amount": int,
    "transfer_id": int
})

transfer_schema = Schema({
    "year": int,
    "month": str,
    "total_mmk": int,
    "total_jpy": int
})

student_schema = Schema({
    "name": str,
    "deactivated_at": Or(None, str),
    "birth_date": str,
    "father_name": str,
    "mother_name": str,
    "parents_occupation": str,
    "photo": str,
    "address_id": Or(None, int)
})
