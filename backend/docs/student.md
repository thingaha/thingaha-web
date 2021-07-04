### CREATE Student

| API              |  Description   | Action |
| :--------------- | :------------: | -----: |
| /api/v1/students | Create Student |   POST |

Input Sample:

```json
{
  "address": {
    "district": "မရမ်းကုန်းမြို့နယ်",
    "division": "yangon",
    "street_address": "ဉီးဘအိုလမ်း",
    "township": "အမှတ်(၂)ရပ်ကွက်"
  },
  "deactivated_at": "2020-07-26T03:37:05.836Z",
  "birth_date": "12-08-2006",
  "father_name": "ဉီးလှ",
  "mother_name": "ဒေါ်မြ",
  "name": "မောင်မောင်",
  "gender": "Female",
  "parents_occupation": "လယ်သမား",
  "photo": "https://i.pinimg.com/originals/a7/65/45/a7654580f501e9501e329978bebd051b.jpg"
}
```

Output Sample:

```json
{
  "data": {
    "total_count": 1,
    "current_page": 1,
    "next_page": null,
    "pages": 1,
    "prev_page": null,
    "student": [
      {
        "address": {
          "district": "မရမ်းကုန်းမြို့နယ်",
          "division": "yangon",
          "id": 30,
          "street_address": "ဉီးဘအိုလမ်း",
          "township": "အမှတ်(၂)ရပ်ကွက်"
        },
        "birth_date": "08-12-2006",
        "deactivated_at": "26-07-2020",
        "father_name": "ဉီးလှ",
        "id": 7,
        "mother_name": "ဒေါ်မြ",
        "name": "မောင်မောင်",
        "gender": "Female",
        "parents_occupation": "လယ်သမား",
        "photo": "https://i.pinimg.com/originals/a7/65/45/a7654580f501e9501e329978bebd051b.jpg"
      }
    ]
  }
}
```

### GET all Students

| API                               |                                      Description                                      | Action |
| :-------------------------------- | :-----------------------------------------------------------------------------------: | -----: |
| /api/v1/students                  |                                    GET all student                                    |    GET |
| /api/v1/students?page=XXX         |                            GET all student with pagination                            |    GET |
| /api/v1/student/search?query=XXXX | search query in name, father_name, mother_name and parents_occupation with pagination |    GET |

default count per page is 20.

Output Sample

```json
{
  "data": {
    "count": 2,
    "students": [
      {
        "address": {
          "district": "မရမ်းကုန်းမြို့နယ်",
          "division": "yangon",
          "id": 4,
          "street_address": "ဉီးဘအိုလမ်း",
          "township": "အမှတ်(၂)ရပ်ကွက်"
        },
        "birth_date": "11-08-2006",
        "deactivated_at": "09-06-2020",
        "father_name": "ဉီးလှ",
        "id": 1,
        "mother_name": "ဒေါ်မြ",
        "name": "မောင်မောင်",
        "parents_occupation": "လယ်သမား",
        "photo": null
      },
      {
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
        "gender": "Female",
        "parents_occupation": "ဈေးရောင်း",
        "photo": null
      }
    ]
  }
}
```

### GET Student by ID

| API                 |    Description    | Action |
| :------------------ | :---------------: | -----: |
| /api/v1/students/id | GET student by id |    GET |

Output Sample

```json
{
  "data": {
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
      "father_name": "ဉီးလှ",
      "id": 1,
      "mother_name": "ဒေါ်မြ",
      "name": "မောင်မောင်",
      "gender": "Female",
      "parents_occupation": "လယ်သမား",
      "photo": "https://kzt.com/51b.jpg"
    }
  }
}
```

### UPDATE student

| API                 |        Description        | Action |
| :------------------ | :-----------------------: | -----: |
| /api/v1/students/id | update student info by id |    PUT |

Input Sample:

```json
{
  "address": {
    "district": "မရမ်းကုန်းမြို့နယ်",
    "division": "yangon",
    "street_address": "ဉီးဘအိုလမ်း",
    "township": "အမှတ်(၂)ရပ်ကွက်"
  },
  "active": true,
  "birth_date": "12-08-2006",
  "father_name": "ဉီးလှ",
  "mother_name": "ဒေါ်မြ",
  "name": "မောင်မောင်",
  "gender": "Female",
  "parents_occupation": "လယ်သမား",
  "photo": "https://i.pinimg.com/originals/a7/65/45/a7654580f501e9501e329978bebd051b.jpg"
}
```

Output Sample:

```json
{
  "data": {
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
      "father_name": "ဉီးလှ",
      "id": 1,
      "mother_name": "ဒေါ်မြ",
      "name": "မောင်မောင်",
      "gender": "Female",
      "parents_occupation": "လယ်သမား",
      "photo": "https://kzt.com/51b.jpg"
    }
  }
}
```

### DELETE student

| API                 |     Description      | Action |
| :------------------ | :------------------: | -----: |
| /api/v1/students/id | Delete student by id | DELETE |

```json
{
  "status": true
}
```

### Save Student Photo

| API                    |          Description           | Action |
| :--------------------- | :----------------------------: | -----: |
| /api/v1/student/upload | Save Photo to S3 and url to DB |   POST |

Input Sample:

```form
request form > file > img
request form > student_id
```

Output Sample:

```json
{
  "data": {
    "student": {
      "address": {
        "district": "မအူပင်ခရိုင်",
        "division": "ayeyarwady",
        "id": 3,
        "street_address": "ငှက်ပျောကျွန်းကျေးရွာ",
        "township": "ညောင်တုန်းမြို့နယ်"
      },
      "birth_date": "1997-12-12",
      "deactivated_at": "28-02-2017",
      "father_name": "ဦးလှကြိုင်",
      "id": 3,
      "mother_name": "ဒေါ်သန်းနွဲ့",
      "name": "မောင်ဇော်မင်းထွေး",
      "gender": "Female",
      "parents_occupation": "ကျပန်း လက်လုပ်လက်စား",
      "photo": "https://thingaha.s3-ap-northeast-1.amazonaws.com/XXXX.png"
    }
  }
}
```

### Update Student Photo

| API                    |    Description     | Action |
| :--------------------- | :----------------: | -----: |
| /api/v1/student/upload | Update Photo in S3 |    PUT |

Input Sample:

```form
request form-data > file > img
request form-data > student_id
request form-data > old_url
```

Output Sample:

```json
{
  "data": {
    "student": {
      "address": {
        "district": "မအူပင်ခရိုင်",
        "division": "ayeyarwady",
        "id": 3,
        "street_address": "ငှက်ပျောကျွန်းကျေးရွာ",
        "township": "ညောင်တုန်းမြို့နယ်"
      },
      "birth_date": "1997-12-12",
      "deactivated_at": "28-02-2017",
      "father_name": "ဦးလှကြိုင်",
      "id": 3,
      "mother_name": "ဒေါ်သန်းနွဲ့",
      "gender": "Female",
      "name": "မောင်ဇော်မင်းထွေး",
      "parents_occupation": "ကျပန်း လက်လုပ်လက်စား",
      "photo": "https://thingaha.s3-ap-northeast-1.amazonaws.com/YYYYY.png"
    }
  }
}
```

### Delete Student Photo

| API                    |                     Description                      | Action |
| :--------------------- | :--------------------------------------------------: | -----: |
| /api/v1/student/delete | Delete Photo in S3 and delete photo url from student | DELETE |

Input Sample:

```json
{
  "url": "https://thingaha.s3-ap-northeast-1.amazonaws.com/st001.png",
  "student_id": 3
}
```

Output status only: 200 for success, 400 for failed

- **_for error detail description please reference error.md_**

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
