### CREATE Address

| API               |  Description   | Action |
| :---------------- | :------------: | -----: |
| /api/v1/addresses | Create Address |   POST |

Input Sample:

```json
{
  "division": "yangon",
  "district": "Yangon",
  "township": "Latha",
  "street_address": "19th street",
  "type": "user"
}
```

Output Sample:

```json
{
  "data": {
    "address": {
      "district": "Yangon",
      "division": "yangon",
      "id": 2,
      "street_address": "17th street",
      "addressable": {
        "id": 1,
        "name": "Maung Maung",
        "type": "user"
      },
      "township": "Latha"
    }
  }
}
```

### GET all Addresses

| API                                |                  Description                  | Action |
| :--------------------------------- | :-------------------------------------------: | -----: |
| /api/v1/addresses                  |               Get all addresses               |    GET |
| /api/v1/addresses?page=XXX         |       Get all addresses with pagination       |    GET |
| /api/v1/addresses?type=XXX         | Get addresses by address type with pagination |    GET |
| /api/v1/addresses/search?query=XXX | Get addresses by search query with pagination |    GET |

address type must be [user, school, student]
default count per page is 20.

Output Sample

```json
{
  "data": {
    "addresses": [
      {
        "addressable": {
          "id": 1,
          "name": "MoeMoe",
          "type": "user"
        },
        "district": "ညောင်တုန်းမြို့",
        "division": "ayeyarwady",
        "id": 1,
        "street_address": "အာဇာနည်လမ်း",
        "township": "အမှတ်(၈)ရပ်ကွက်"
      },
      {
        "addressable": {
          "id": 1,
          "name": "No.(1)Nyanungdon",
          "type": "school"
        },
        "district": "ညောင်တုန်းမြို့",
        "division": "ayeyarwady",
        "id": 2,
        "street_address": "အောင်သုခလမ်း",
        "township": "အမှတ်(၈)ရပ်ကွက်"
      },
      {
        "addressable": {
          "id": 2,
          "name": "No.(2)Nyanungdon",
          "type": "school"
        },
        "district": "ညောင်တုန်းမြို့",
        "division": "ayeyarwady",
        "id": 3,
        "street_address": "ဘောဂလမ်း",
        "township": "အမှတ်(၈)ရပ်ကွက်"
      },
      {
        "addressable": {
          "id": 3,
          "name": "No.(3)Nyanungdon",
          "type": "school"
        },
        "district": "မရမ်းကုန်းမြို့နယ်",
        "division": "yangon",
        "id": 4,
        "street_address": "ဉီးဘအိုလမ်း",
        "township": "အမှတ်(၂)ရပ်ကွက်"
      },
      {
        "addressable": {
          "id": 1,
          "name": "မောင်မောင်",
          "type": "student"
        },
        "district": "သာကေတမြို့နယ်",
        "division": "yangon",
        "id": 5,
        "street_address": "၃၆လမ်း",
        "township": "အမှတ်(၄)ရပ်ကွက်"
      },
      {
        "addressable": {
          "id": 2,
          "name": "မြမြ",
          "type": "student"
        },
        "district": "မရမ်းကုန်းမြို့နယ်",
        "division": "yangon",
        "id": 6,
        "street_address": "ဉီးဘအိုလမ်း",
        "township": "အမှတ်(၂)ရပ်ကွက်"
      },
      {
        "addressable": {
          "id": 3,
          "name": "လှလှ",
          "type": "student"
        },
        "district": "သာကေတမြို့နယ်",
        "division": "yangon",
        "id": 7,
        "street_address": "၃၆လမ်း",
        "township": "အမှတ်(၄)ရပ်ကွက်"
      },
      {
        "addressable": {
          "id": 4,
          "name": "စုစု",
          "type": "student"
        },
        "district": "မရမ်းကုန်းမြို့နယ်",
        "division": "yangon",
        "id": 8,
        "street_address": "ဉီးဘအိုလမ်း",
        "township": "အမှတ်(၂)ရပ်ကွက်"
      },
      {
        "addressable": {
          "id": 5,
          "name": "မောင်လှအောင်",
          "type": "student"
        },
        "district": "ညောင်တုန်းမြို့",
        "division": "ayeyarwady",
        "id": 9,
        "street_address": "ဘောဂလမ်း",
        "township": "အမှတ်(၈)ရပ်ကွက်"
      }
    ],
    "current_page": 1,
    "next_page": null,
    "pages": 1,
    "prev_page": null,
    "total_count": 9
  }
}
```

### GET Address by ID

| API                  |    Description    | Action |
| :------------------- | :---------------: | -----: |
| /api/v1/addresses/id | GET address by id |    GET |

Output Sample

```json
{
  "data": {
    "address": {
      "district": "Yangon",
      "division": "yangon",
      "id": 2,
      "addressable": {
        "id": 1,
        "name": "Maung Maung",
        "type": "student"
      },
      "street_address": "19th street",
      "township": "Latha"
    }
  }
}
```

### UPDATE Address

| API                  |        Description        | Action |
| :------------------- | :-----------------------: | -----: |
| /api/v1/addresses/id | update address info by id |    PUT |

Input Sample:

```json
{
  "division": "yangon",
  "district": "Yangon",
  "township": "Latha",
  "street_address": "17th street",
  "type": "donator"
}
```

Output Sample:

```json
{
  "data": {
    "address": {
      "district": "yangon",
      "division": "yangon",
      "id": 2,
      "street_address": "21th street",
      "township": "Latha"
    }
  }
}
```

### DELETE Address

| API                  |     Description      | Action |
| :------------------- | :------------------: | -----: |
| /api/v1/addresses/id | Delete address by id | DELETE |

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
