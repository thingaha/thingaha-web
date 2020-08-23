### CREATE User
| API      | URL | Action     |
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
    "street_address": "18 street",
    "township": "La Thar township"
}
```
Output Sample:
```
{
  "data": {
    "user": {
      "id": 1,
      "name": "MoeMoe",
      "email": "moemoe@gmail.com",
      "role": "admin",
      "country": "mm",
      "address": {
        "district": "pabedan",
        "division": "yangon",
        "id": 1,
        "street_address": "18 street",
        "township": "La Thar township"
      },
      "formatted_address": "18 street, La Thar township, pabedan, yangon"
    }
  }
}
```

### GET all Users
| API      | URL | Action     |
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
| API      | URL | Action     |
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
| API      | URL | Action     |
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
    "township": "La Thar township"
}
```

Output Sample:
```json
{
  "status": true
}
```


### DELETE user

| API      | URL | Action     |
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
