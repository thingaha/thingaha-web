### CREATE Address
| API      | URL | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/addresses     | Create Address    | POST   |

Input Sample:
```json
{
    "division": "yangon",
    "district": "Yangon",
    "township": "Latha",
    "street_address": "19th street"
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
            "street_address": "19th street",
            "township": "Latha"
        }
    }
}
```

### GET all Addresses
| API      | URL | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/addresses     | GET all addresses      | GET   |

Output Sample
```json
{
    "data": {
        "count": 2,
        "addresses": [
            {
                "district": "Yangon",
                "division": "yangon",
                "id": 1,
                "street_address": "Thanlan street",
                "township": "Hlaing"
            },
            {
                "district": "Yangon",
                "division": "yangon",
                "id": 2,
                "street_address": "19th street",
                "township": "Latha"
            }
        ]
    }
}
```

### GET Address by ID
| API      | URL | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/addresses/id     | GET address by id    | GET   |

Output Sample
```json
{
    "data": {
        "address": {
            "district": "Yangon",
            "division": "yangon",
            "id": 2,
            "street_address": "19th street",
            "township": "Latha"
        }
    }
}
```

### UPDATE Address
| API      | URL | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/addresses/id     | update address info by id     | PUT  |

Input Sample:
```json
{
    "division": "yangon",
    "district": "Yangon",
    "township": "Latha",
    "street_address": "17th street"
}
```

Output Sample:
```json
{
  "status": true
}
```

### DELETE Address
| API      | URL | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/addresses/id     | Delete address by id     | DELETE  |

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
- ***for error detail description please reference error.md***
