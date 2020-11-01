### CREATE Student
| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/students     | Create Student       | POST   |

Input Sample:
```json
{
  "district": "မရမ်းကုန်းမြို့နယ်", 
  "division": "yangon", 
  "street_address": "ဉီးဘအိုလမ်း", 
  "township": "အမှတ်(၂)ရပ်ကွက်",
  "type" : "student",
  "deactivated_at" : "2020-07-26T03:37:05.836Z",
  "birth_date": "12-08-2006", 
  "father_name": "ဉီးလှ", 
  "mother_name": "ဒေါ်မြ", 
  "name": "မောင်မောင်", 
  "parents_occupation": "လယ်သမား", 
  "photo": "https://i.pinimg.com/originals/a7/65/45/a7654580f501e9501e329978bebd051b.jpg"
}
```
Output Sample:
```json
{
  "data": {
    "count": 1, 
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
        "parents_occupation": "လယ်သမား", 
        "photo": "https://i.pinimg.com/originals/a7/65/45/a7654580f501e9501e329978bebd051b.jpg"
      }
    ]
  }
}
```

### GET all Students
| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/students     | GET all student       | GET   |
| /api/v1/students?page=XXX     | GET all student with pagination      | GET   |
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
        "parents_occupation": "ဈေးရောင်း", 
        "photo": null
      }
    ]
  }
}
```

### GET Student by ID
| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/students/id     | GET student by id     | GET   |
Output Sample
```json
{
  "data": {
    "count": 1, 
    "student": [
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
      }
    ]
  }
}

```
### UPDATE student
| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/students/id     | update student info by id     | PUT  |
Input Sample:
```json
{
  "district": "မရမ်းကုန်းမြို့နယ်", 
  "division": "yangon", 
  "street_address": "ဉီးဘအိုလမ်း", 
  "township": "အမှတ်(၂)ရပ်ကွက်",
  "type" : "student",
  "address_id": 1,
  "deactivated_at" : "2020-07-26T03:37:05.836Z",
  "birth_date": "12-08-2006", 
  "father_name": "ဉီးလှ", 
  "mother_name": "ဒေါ်မြ", 
  "name": "မောင်မောင်", 
  "parents_occupation": "လယ်သမား", 
  "photo": "https://i.pinimg.com/originals/a7/65/45/a7654580f501e9501e329978bebd051b.jpg"
}
```

Output Sample:
```json
{
  "status": true
}
```


### DELETE student

| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/students/id     | Delete student by id     | DELETE  |
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
