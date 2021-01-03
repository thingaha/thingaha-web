### LOGIN API

| API           | Description | Action |
| :------------ | :---------: | -----: |
| /api/v1/login |  Get token  |   POST |

Input Sample:

```json
{
  "email_or_username": "moemoe@gmail.com",
  "password": "123"
}
```

OR

```json
{
  "username": "moemoe@gmail.com",
  "password": "123"
}
```

Output Sample:

```json
{
  "access_token": "eyJ0eXAiOXXXXX",
  "user": {
    "id": 1,
    "email": "moemoe@gmail.com",
    "username": "Moe Moe"
  }
}
```

### CREATE User

| API           | Description | Action |
| :------------ | :---------: | -----: |
| /api/v1/users | Create User |   POST |

Input Sample:

```json
{
  "username": "moemoe",
  "display_name": "Khine Zar Thwe",
  "email": "moemoe@gmail.com",
  "password": "123",
  "role": "admin",
  "country": "mm",
  "address": {
    "district": "pabedan",
    "division": "yangon",
    "street_address": "18 street",
    "township": "La Thar township"
  }
}

* NOTE: address is optional. If no address key is supplied in data, system will create a default address.
```

##### username format

```
username is 8-20 characters long
no _ or . at the beginning
no __ or _. or ._ or .. inside
allowed characters
no _ or . at the end
```

Output Sample:

```json
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
        "username": "MoeMoe",
        "display_name": "Khine Zar Thwe",
        "role": "admin"
      }
    ]
  }
}
```

### GET all Users

| API                              |                    Description                     | Action |
| :------------------------------- | :------------------------------------------------: | -----: |
| /api/v1/users                    |                   GET all users                    |    GET |
| /api/v1/users?page=XXX           |           GET all users with pagination            |    GET |
| /api/v1/users/search?query=xxx   |  Get user by search (name, email) with pagination  |    GET |
| /api/v1/users?role=xx            |     Get user by filter (role) with pagination      |    GET |
| /api/v1/users?country=xx         |    Get user by filter (country) with pagination    |    GET |
| /api/v1/users?role=xx&country=xx | Get user by filter (country, role) with pagination |    GET |

default count per page for pagination is 20.

Output Sample

```json
{
  "data": {
    "current_page": 1,
    "next_page": null,
    "pages": 0,
    "prev_page": null,
    "total_count": 3,
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
        "username": "khinezar1",
        "display_name": "Khine Zar Thwe",
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
        "username": "khinezar2",
        "display_name": "Khine Zar Thwe",
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
        "username": "thingyan_test01",
        "display_name": "Khine Zar Thwe",
        "role": "admin"
      }
    ]
  }
}
```

### GET User by ID

| API              |  Description   | Action |
| :--------------- | :------------: | -----: |
| /api/v1/users/id | GET user by id |    GET |

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
      "username": "khinezar1",
      "display_name": "Khine Zar Thwe",
      "role": "donator"
    }
  }
}
```

### UPDATE user

| API              |      Description       | Action |
| :--------------- | :--------------------: | -----: |
| /api/v1/users/id | update user info by id |    PUT |

Input Sample:

```json
{
  "username": "thingyan_test01",
  "display_name": "Khine Zar Thwe",
  "email": "thingyan_test01@gmail.com",
  "password": "1234",
  "role": "admin",
  "country": "mm",
  "address": {
    "district": "pabedan",
    "division": "yangon",
    "street_address": "18 street",
    "township": "La Thar township"
  },
  "donation_active": true
}
```

Output Sample:

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
      "username": "khinezar1",
      "display_name": "Khine Zar Thwe",
      "role": "donator"
    }
  }
}
```

### DELETE user

| API              |    Description    | Action |
| :--------------- | :---------------: | -----: |
| /api/v1/users/id | Delete user by id | DELETE |

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

### User update password

| API                    |     Description      | Action |
| :--------------------- | :------------------: | -----: |
| /api/v1/users/password | Update user password |    PUT |

Input Sample:

```json
{
  "current_password": "1234",
  "new_password": "1234",
  "new_confirm_password": "1234"
}
```

Output Sample:

```json
{
  "status": true
}
```

/users/reset_password

### reset password

| API                          |                 Description                 | Action |
| :--------------------------- | :-----------------------------------------: | -----: |
| /api/v1/users/reset_password | reset user password(only full admin can do) |    PUT |

Input Sample:

```json
{
  "user_id": 1,
  "password": "1234"
}
```

Output Sample:

```json
{
  "status": true
}
```

- **_for error detail description please reference error.md_**
