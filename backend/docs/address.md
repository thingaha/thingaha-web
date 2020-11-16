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

| API                        |            Description            | Action |
| :------------------------- | :-------------------------------: | -----: |
| /api/v1/addresses          |         Get all addresses         |    GET |
| /api/v1/addresses?page=XXX | Get all addresses with pagination |    GET |

default count per page is 20.

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
        "addressable": {
          "id": 1,
          "name": "Maung Maung",
          "type": "user"
        },
        "street_address": "Thanlan street",
        "township": "Hlaing"
      },
      {
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
    ]
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
