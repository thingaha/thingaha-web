### Donation API
### CREATE Donation
| API      | URL | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/donation     | Create Donation       | POST   |

Input Sample:
```json
{
    "user_id": 1,
    "attendance_id": 1,
    "transfer_id": 1,
    "month": "january",
    "year":2020,
    "mmk_amount":3000.0,
    "jpy_amount":0.0,
    "paid_at":"2020-09-25"
}
```
Output Sample:
```
{
  "data": {
        "id": 1,
        "jpy_amount": 0,
        "mmk_amount": 3000,
        "month": "january",
        "status": "paid",
        "student": {
            "address": {
                "district": "thanlyin",
                "division": "yangon",
                "id": 2,
                "street_address": "456",
                "township": "thanlyin"
            },
            "birth_date": "",
            "deactivated_at": "",
            "father_name": "U Mya",
            "id": 1,
            "mother_name": "Daw Aye",
            "name": "etm",
            "parents_occupation": "Depent"
        },
        "user": {
            "address": {
                "district": "kyauktan",
                "division": "yangon",
                "id": 1,
                "street_address": "123",
                "township": "kyauktan"
            },
            "country": "jp",
            "email": "kwo@gmail.com",
            "formatted_address": "123, kyauktan, kyauktan, yangon",
            "id": 1,
            "name": "kwo",
            "role": "donator"
        },
        "year": 2020
        }
    }
}```
