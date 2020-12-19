### CREATE Transfer

| API               |   Description   | Action |
| :---------------- | :-------------: | -----: |
| /api/v1/transfers | Create Transfer |   POST |

Input Sample:

```json
{
  "year": 2020,
  "month": "march",
  "total_mmk": 3000,
  "total_jpy": 200
}
```

Output Sample:

```json
{
  "data": {
    "transfers": {
      "id": 8,
      "month": "march",
      "total_jpy": 200.0,
      "total_mmk": 3000.0,
      "year": 2020
    }
  }
}
```

### GET all Transfers

| API                        |           Description            | Action |
| :------------------------- | :------------------------------: | -----: |
| /api/v1/transfers          |        GET all transfers         |    GET |
| /api/v1/transfers?page=XXX | GET all transfer with pagination |    GET |

default count per page is 20.

Output Sample

```json
{
  "data": {
    "current_page": 1,
    "next_page": null,
    "pages": 1,
    "prev_page": null,
    "total_count": 5,
    "transfers": [
      {
        "id": 4,
        "month": "march",
        "total_jpy": 200.0,
        "total_mmk": 3000.0,
        "year": 2020
      },
      {
        "id": 5,
        "month": "march",
        "total_jpy": 200.0,
        "total_mmk": 3000.0,
        "year": 2020
      },
      {
        "id": 6,
        "month": "march",
        "total_jpy": 200.0,
        "total_mmk": 3000.0,
        "year": 2020
      },
      {
        "id": 7,
        "month": "march",
        "total_jpy": 200.0,
        "total_mmk": 3000.0,
        "year": 2020
      },
      {
        "id": 8,
        "month": "march",
        "total_jpy": 200.0,
        "total_mmk": 3000.0,
        "year": 2020
      }
    ]
  }
}
```

### GET Transfer by ID

| API                 |        Description        | Action |
| :------------------ | :-----------------------: | -----: |
| api/v1/transfers/id | GET transfer record by id |    GET |

Output Sample

```json
{
  "data": {
    "transfer": {
      "id": 1,
      "month": "march",
      "total_jpy": 200.0,
      "total_mmk": 3000.0,
      "year": 2020
    }
  }
}
```

### UPDATE Transfer

| API                  |         Description         | Action |
| :------------------- | :-------------------------: | -----: |
| /api/v1/transfers/id | update transfers info by id |    PUT |

Input Sample:

```json
{
  "year": 2020,
  "month": "march",
  "total_mmk": 3000,
  "total_jpy": 0
}
```

Output Sample:

```json
{
  "data": {
    "transfer": {
      "id": 1,
      "month": "march",
      "total_jpy": 200.0,
      "total_mmk": 3000.0,
      "year": 2020
    }
  }
}
```

### DELETE Transfers

| API                  |      Description      | Action |
| :------------------- | :-------------------: | -----: |
| /api/v1/transfers/id | Delete transfer by id | DELETE |

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
