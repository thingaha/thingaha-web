### LOGIN API
| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/login     | Get token       | POST   |

Input Sample:
```json
{
    "email": "moemoe@gmail.com",
    "password": "123"
}
```

Output Sample:
```json
{
    "access_token": "eyJ0eXAiOXXXXX"
}
```

### CREATE User
| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/user     | Create User       | POST   |

Input Sample:
```json
{
    "name": "MoeMoe", 
    "email": "moemoe@gmail.com",
    "password" : "123", 
    "role": "admin", 
    "country": "mm",
    "district": "pabedan",
    "division": "yangon",
    "donation_active": true,
    "street_address": "18 street",
    "township": "La Thar township",
    "type": "user"
}
```
Output Sample:
```
{
    "data": {
        "count": 1,
        "users": [
            {
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
            }
        ]
    }
}
```

### GET all Users
| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/user     | GET all user       | GET   |

Output Sample
``` json
{
  "data": {
    "count": 3,
    "users": [
      {
        "address": {
          "district": "yangon",
          "division": "yangon",
          "id": 1,
          "street_address": "11 street",
          "township": "MyaeNiGone"
        },
        "country": "mm",
        "donation_active": true,
        "email": "kzt1@gmail.com",
        "formatted_address": "11 street, MyaeNiGone, yangon, yangon",
        "id": 2,
        "name": "khinezar1",
        "role": "donator"
      },
      {
        "address": {
          "district": "yangon",
          "division": "yangon",
          "id": 1,
          "street_address": "12 street",
          "township": "MyaeNiGone"
        },
        "country": "mm",
        "donation_active": true,
        "email": "kzt2@gmail.com",
        "formatted_address": "12 street, MyaeNiGone, yangon, yangon",
        "id": 3,
        "name": "khinezar2",
        "role": "donator"
      },
      {
        "address": {
          "district": "yangon",
          "division": "yangon",
          "id": 10,
          "street_address": "18 street",
          "township": "La Thar township"
        },
        "country": "mm",
        "donation_active": false,
        "email": "thingyan_test01@gmail.com",
        "formatted_address": "18 street, La Thar township, yangon, yangon",
        "id": 4,
        "name": "thingyan_test01",
        "role": "admin"
      }
    ]
  }
}
```

### GET User by ID
| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/user/id     | GET user by id     | GET   |
Output Sample
```json
{
  "data": {
    "user": {
      "address": {
        "district": "yangon",
        "division": "yangon",
        "id": 1,
        "street_address": "11 street",
        "township": "MyaeNiGone"
      },
      "country": "mm",
      "email": "kzt1@gmail.com",
      "formatted_address": "11 street, MyaeNiGone, yangon, yangon",
      "id": 2,
      "name": "khinezar1",
      "role": "donator"
    }
  }
}
```
### UPDATE user
| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/user/id     | update user info by id     | PUT  |
Input Sample:
```json
{
    "id": 1,
    "name": "thingyan_test01",
    "email": "thingyan_test01@gmail.com",
    "password" : "1234", 
    "role": "admin",
    "country": "mm",
    "address_id": 1,
    "district": "pabedan",
    "division": "yangon",
    "street_address": "19 street",
    "township": "La Thar township",
    "type": "user"
}
```

Output Sample:
```json
{
  "status": true
}
```


### DELETE user

| API      | Description | Action     |
| :---        |    :----:   |          ---: |
| /api/v1/user/id     | Delete user by id     | DELETE  |
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
