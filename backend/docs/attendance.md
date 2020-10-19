### CREATE Attendance
| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/attendances     | Create attendance       | POST   |

Input Sample:
```json
{
    "student_id": 1,
    "school_id": 1,
    "grade": "G-10",
    "year": "2020",
    "enrolled_date": "2020-02-02"
}
```
Output Sample:
```json
{
    "data": {
        "attendances": [
            {
                "enrolled_date": "02-02-2020",
                "grade": "G-9",
                "id": 1,
                "school": {
                    "address": {
                        "district": "pabedan",
                        "division": "yangon",
                        "id": 1,
                        "street_address": "19 street",
                        "township": "La Thar township"
                    },
                    "contact_info": "098",
                    "id": 1,
                    "name": "No.(21)Nyanungdon"
                },
                "student": {
                    "address": {
                        "district": "tharkayta",
                        "division": "yangon",
                        "id": 1,
                        "street_address": "18 street",
                        "township": "La Thar township"
                    },
                    "birth_date": "09-06-2020",
                    "deactivated_at": "",
                    "father_name": "U Aye",
                    "id": 1,
                    "mother_name": "Daw Aye",
                    "name": "Student1",
                    "parents_occupation": "Farmer"
                },
                "year": "2020"
            }
        ],
        "count": 1
    }
}
```

### GET all Attendances
| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/attendances     | GET all Attendances       | GET   |

Output Sample
```json
{
    "data": {
        "attendances": [
            {
                "enrolled_date": "02-02-2020",
                "grade": "G-10",
                "id": 2,
                "school": {
                    "address": {
                        "district": "pabedan",
                        "division": "yangon",
                        "id": 1,
                        "street_address": "18 street",
                        "township": "La Thar township"
                    },
                    "contact_info": "098",
                    "id": 1,
                    "name": "No.(21)Nyanungdon"
                },
                "student": {
                    "address": {
                        "district": "pabedan",
                        "division": "yangon",
                        "id": 1,
                        "street_address": "18 street",
                        "township": "La Thar township"
                    },
                    "birth_date": "09-06-2020",
                    "deactivated_at": "",
                    "father_name": "U Aye",
                    "id": 1,
                    "mother_name": "Daw Aye",
                    "name": "Student1",
                    "parents_occupation": "Farmer"
                },
                "year": "2020"
            },
            {
                "enrolled_date": "02-02-2020",
                "grade": "G-9",
                "id": 1,
                "school": {
                    "address": {
                        "district": "pabedan",
                        "division": "yangon",
                        "id": 1,
                        "street_address": "18 street",
                        "township": "La Thar township"
                    },
                    "contact_info": "098",
                    "id": 1,
                    "name": "No.(21)Nyanungdon"
                },
                "student": {
                    "address": {
                        "district": "pabedan",
                        "division": "yangon",
                        "id": 1,
                        "street_address": "18 street",
                        "township": "La Thar township"
                    },
                    "birth_date": "09-06-2020",
                    "deactivated_at": "",
                    "father_name": "U Aye",
                    "id": 1,
                    "mother_name": "Daw Aye",
                    "name": "Student1",
                    "parents_occupation": "Farmer"
                },
                "year": "2020"
            }
        ],
        "count": 2
    }
}
```

### GET Attendance by ID
| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/attendances/id     | GET attendance by id     | GET   |
Output Sample
```json
{
    "data": {
        "attendance": [
            {
                "enrolled_date": "02-02-2020",
                "grade": "G-9",
                "id": 1,
                "school": {
                    "address": {
                        "district": "pabedan",
                        "division": "yangon",
                        "id": 1,
                        "street_address": "19 street",
                        "township": "La Thar township"
                    },
                    "contact_info": "098",
                    "id": 1,
                    "name": "No.(21)Nyanungdon"
                },
                "student": {
                    "address": {
                        "district": "tharkayta",
                        "division": "yangon",
                        "id": 1,
                        "street_address": "18 street",
                        "township": "La Thar township"
                    },
                    "birth_date": "09-06-2020",
                    "deactivated_at": "",
                    "father_name": "U Aye",
                    "id": 1,
                    "mother_name": "Daw Aye",
                    "name": "Student1",
                    "parents_occupation": "Farmer"
                },
                "year": "2020"
            }
        ],
        "count": 1
    }
}
```
### UPDATE Attendance
| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/attendances/id     | update school info by id     | PUT  |
Input Sample:
```json
{
    "student_id": 1,
    "school_id": 1,
    "grade": "G-9",
    "year": "2020",
    "enrolled_date": "2020-02-02"
}
```

Output Sample:
```json
{
  "status": true
}
```


### DELETE attendance

| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/attendances/id     | Delete attendances by id     | DELETE  |
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
