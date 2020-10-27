### CREATE School
| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/school     | Create School       | POST   |

Input Sample:
```json
{
    "school_name": "No.(21)Nyanungdon",
    "contact_info": "098",
    "district": "yangon",
    "division": "yangon",
    "street_address": "18 street",
    "township": "MyaeNiGone",
    "type": "school"
}
```
Output Sample:
```json
{
  "data": {
    "count": 1,
    "schools": [
      {
        "address": {
          "district": "yangon",
          "division": "yangon",
          "id": 15,
          "street_address": "18 street",
          "township": "MyaeNiGone"
        },
        "contact_info": "098",
        "id": 12,
        "name": "No.(21)Nyanungdon"
      }
    ]
  }
}
```

### GET all Schools
| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/school     | GET all school       | GET   |

Output Sample
```json
{
  "data": {
    "count": 2,
    "schools": [
      {
        "address": {
          "district": "hlaingtharyar-3",
          "division": "ayeyarwady",
          "id": 5,
          "street_address": "nyaungdon-3",
          "township": "hlaingtharyar-3"
        },
        "contact_info": "098760987263",
        "id": 4,
        "name": "No.(3)Nyanungdon"
      },
      {
        "address": {
          "district": "hlaingtharyar-4",
          "division": "yangon",
          "id": 6,
          "street_address": "nyaungdon-4",
          "township": "hlaingtharyar-4"
        },
        "contact_info": "098760987263",
        "id": 5,
        "name": "No.(4)Nyanungdon"
      }
    ]
  }
}
```

### GET School by ID
| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/school/id     | GET school by id     | GET   |
Output Sample
```json
{
  "data": {
    "count": 1,
    "school": [
      {
        "address": {
          "district": "yangon",
          "division": "yangon",
          "id": 12,
          "street_address": "18 street",
          "township": "MyaeNiGone"
        },
        "contact_info": "098",
        "id": 10,
        "name": "No.(11)Nyanungdon"
      }
    ]
  }
}
```
### UPDATE school
| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/school/id     | update school info by id     | PUT  |
Input Sample:
```json
{
    "school_name": "No.(11)Nyanungdon",
    "contact_info": "098",
    "address_id": 11,
    "district": "yangon",
    "division": "yangon",
    "street_address": "18 street",
    "township": "MyaeNiGone",
    "type": "school"
}

```

Output Sample:
```json
{
  "status": true
}
```


### DELETE school

| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/school/id     | Delete school by id     | DELETE  |
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
