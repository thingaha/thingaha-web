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
