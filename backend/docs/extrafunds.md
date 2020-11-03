### CREATE Extrafunds
| API      | URL | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/extrafunds     | Create Extrafund    | POST   |

Input Sample:
```json
{
    "mmk_amount": 30000,
    "transfer_id": 1
}
```
Output Sample:
```json
{
  "data": {
    "extrafunds": [
      {
            "id": 1,
            "mmk_amount": 100000,
            "transfer_id": {
                "id": 1,
                "year": "2020",
                "month": "january",
                "total_mmk": "35000",
                "total_jpy": "3000"
            }
       }
    ]
  }
}
```

### GET all Extrafunds
| API      | URL | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/extrafunds     | GET all extrafunds      | GET   |

Output Sample
```json
{
    "data": {
        "count": 2,
        "extrafunds": [
            {
                "id": 1,
                "mmk_amount": 100000,
                "transfer_id": {
                    "id": 1,
                    "year": "2020",
                    "month": "january",
                    "total_mmk": "35000",
                    "total_jpy": "3000"
                }
            },
            {
                "id": 2,
                "mmk_amount": 200000,
                "transfer_id": {
                    "id": 2,
                    "year": "2020",
                    "month": "february",
                    "total_mmk": "35000",
                    "total_jpy": "3000"
                }
            }
        ]
    }
}
```

### GET Extrafund by ID
| API      | URL | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/extrafunds/id     | GET extrafund by id    | GET   |

Output Sample
```json
{
  "data": {
    "extrafunds": [
      {
            "id": 2,
            "mmk_amount": 100000,
            "transfer_id": {
                "id": 2,
                "year": "2020",
                "month": "january",
                "total_mmk": "35000",
                "total_jpy": "3000"
            }
       }
    ]
  }
}
```

### UPDATE Extrafund
| API      | URL | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/extrafunds/id     | update extrafund info by id     | PUT  |

Input Sample:
```json
{
    "mmk_amount": 100000,
    "transfer_id": {
      "id": 1,
      "year": "2020",
      "month": "january",
      "total_mmk": "35000",
      "total_jpy": "3000"
    }
}
```

Output Sample:
```json
{
  "status": true
}
```

### DELETE Extrafund
| API      | URL | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/extrafunds/id     | Delete extrafund by id     | DELETE  |

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
