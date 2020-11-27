### CREATE Donation

| API               |   Description   | Action |
| :---------------- | :-------------: | -----: |
| /api/v1/donations | Create Donation |   POST |

Input Sample:

```json
{
  "user_id": 1,
  "attendance_id": 2,
  "transfer_id": 1,
  "month": "january",
  "year": 2020,
  "mmk_amount": 3000.0,
  "jpy_amount": 0.0,
  "paid_at": "2020-02-02"
}
```

Output Sample:

```json
{
  "data": {
    "count": 1,
    "donations": [
      {
        "id": 3,
        "jpy_amount": 0.0,
        "mmk_amount": 3000.0,
        "month": "january",
        "status": "paid",
        "student": {
          "address": {
            "district": "သာကေတမြို့နယ်",
            "division": "yangon",
            "id": 5,
            "street_address": "၃၆လမ်း",
            "township": "အမှတ်(၄)ရပ်ကွက်"
          },
          "birth_date": "11-08-2006",
          "deactivated_at": "09-06-2020",
          "father_name": "ဉီးအောင်အောင်",
          "id": 2,
          "mother_name": "ဒေါ်အေးမြ",
          "name": "မြမြ",
          "parents_occupation": "ဈေးရောင်း"
        },
        "user": {
          "address": {
            "district": "ညောင်တုန်းမြို့",
            "division": "ayeyarwady",
            "id": 1,
            "street_address": "အာဇာနည်လမ်း",
            "township": "အမှတ်(၈)ရပ်ကွက်"
          },
          "country": "mm",
          "donation_active": true,
          "email": "moemoe@gmail.com",
          "formatted_address": "အာဇာနည်လမ်း, အမှတ်(၈)ရပ်ကွက်, ညောင်တုန်းမြို့, ayeyarwady",
          "id": 1,
          "name": "MoeMoe",
          "role": "admin"
        },
        "year": 2020
      }
    ]
  }
}
```

### GET all donations

| API               |    Description    | Action |
| :---------------- | :---------------: | -----: |
| /api/v1/donations | GET all donations |    GET |

Output Sample

```json
{
  "data": {
    "count": 1,
    "donations": [
      {
        "id": 1,
        "jpy_amount": 0.0,
        "mmk_amount": 3000.0,
        "month": "january",
        "status": "paid",
        "student": {
          "address": {
            "district": "သာကေတမြို့နယ်",
            "division": "yangon",
            "id": 5,
            "street_address": "၃၆လမ်း",
            "township": "အမှတ်(၄)ရပ်ကွက်"
          },
          "birth_date": "11-08-2006",
          "deactivated_at": "09-06-2020",
          "father_name": "ဉီးအောင်အောင်",
          "id": 2,
          "mother_name": "ဒေါ်အေးမြ",
          "name": "မြမြ",
          "parents_occupation": "ဈေးရောင်း"
        },
        "user": {
          "address": {
            "district": "ညောင်တုန်းမြို့",
            "division": "ayeyarwady",
            "id": 1,
            "street_address": "အာဇာနည်လမ်း",
            "township": "အမှတ်(၈)ရပ်ကွက်"
          },
          "country": "mm",
          "donation_active": true,
          "email": "moemoe@gmail.com",
          "formatted_address": "အာဇာနည်လမ်း, အမှတ်(၈)ရပ်ကွက်, ညောင်တုန်းမြို့, ayeyarwady",
          "id": 1,
          "name": "MoeMoe",
          "role": "admin"
        },
        "year": 2020
      }
    ]
  }
}
```

### GET Donation by ID

| API                 |        Description        | Action |
| :------------------ | :-----------------------: | -----: |
| api/v1/donations/id | GET donation record by id |    GET |

Output Sample

```json
{
  "data": {
    "count": 1,
    "donations": [
      {
        "id": 1,
        "jpy_amount": 0.0,
        "mmk_amount": 3000.0,
        "month": "january",
        "status": "paid",
        "student": {
          "address": {
            "district": "သာကေတမြို့နယ်",
            "division": "yangon",
            "id": 5,
            "street_address": "၃၆လမ်း",
            "township": "အမှတ်(၄)ရပ်ကွက်"
          },
          "birth_date": "11-08-2006",
          "deactivated_at": "09-06-2020",
          "father_name": "ဉီးအောင်အောင်",
          "id": 2,
          "mother_name": "ဒေါ်အေးမြ",
          "name": "မြမြ",
          "parents_occupation": "ဈေးရောင်း"
        },
        "user": {
          "address": {
            "district": "ညောင်တုန်းမြို့",
            "division": "ayeyarwady",
            "id": 1,
            "street_address": "အာဇာနည်လမ်း",
            "township": "အမှတ်(၈)ရပ်ကွက်"
          },
          "country": "mm",
          "donation_active": true,
          "email": "moemoe@gmail.com",
          "formatted_address": "အာဇာနည်လမ်း, အမှတ်(၈)ရပ်ကွက်, ညောင်တုန်းမြို့, ayeyarwady",
          "id": 1,
          "name": "MoeMoe",
          "role": "admin"
        },
        "year": 2020
      }
    ]
  }
}
```

### UPDATE Donation

| API                  |         Description         | Action |
| :------------------- | :-------------------------: | -----: |
| /api/v1/donations/id | update donations info by id |    PUT |

Input Sample:

```json
{
  "user_id": 1,
  "attendance_id": 2,
  "transfer_id": 1,
  "month": "january",
  "year": 2021,
  "mmk_amount": 6000.0,
  "jpy_amount": 0.0,
  "paid_at": "2020-02-02"
}
```

Output Sample:

```json
{
    "data": {
        "donation": {
            "id": 1,
            "jpy_amount": 0.0,
            "mmk_amount": 3000.0,
            "month": "january",
            "status": "paid",
            "student": {
                "address": {
                    "district": "မရမ်းကုန်းမြို့နယ်",
                    "division": "yangon",
                    "id": 6,
                    "street_address": "ဉီးဘအိုလမ်း",
                    "township": "အမှတ်(၂)ရပ်ကွက်"
                },
                "birth_date": "11-08-2006",
                "deactivated_at": "09-06-2020",
                "father_name": "ဉီးအောင်အောင်",
                "id": 2,
                "mother_name": "ဒေါ်အေးမြ",
                "name": "မြမြ",
                "parents_occupation": "ဈေးရောင်း",
                "photo": "https://kzt.com/51b.jpg"
            },
            "user": {
                "address": {
                    "district": "pabedan",
                    "division": "yangon",
                    "id": 1,
                    "street_address": "19 street",
                    "township": "La Thar township"
                },
                "country": "mm",
                "donation_active": true,
                "email": "moemoe1@gmail.com",
                "formatted_address": "19 street, La Thar township, pabedan, yangon",
                "id": 1,
                "name": "Moemoe1",
                "role": "admin"
            },
            "year": 2020
        }
    }
}
```

### DELETE Donations

| API                  |      Description      | Action |
| :------------------- | :-------------------: | -----: |
| /api/v1/donations/id | Delete donation by id | DELETE |

Output Sample:

```json
{
  "status": true
}
```

### ERROR

```json
{
  "errors": {
    "error": {
      "description": "Error Description",
      "error_code": "ERROR CODE",
      "reason": "ERROR Reason"
    }
  }
}
```

- **_for error detail description please reference error.md_**
