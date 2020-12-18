# ems-mean
Employee Management nodejs mongoose/expressjs/angularjs/nodejs

set path=%path%;C:\mongodb\bin

mongo bookapi-test


https://app.pluralsight.com/library/courses/node-js-express-rest-web-services-update/table-of-contents
http://howtonode.org/express-mongodb

## Create New Employee
> This create new employee and save to the database

- **Endpoint:** `/employee`
- **Method:** `POST`
- **Body:**

```json
{
    "firstname": "prakash",
    "lastname": "vivek",
    "email": "google@gmail.com",
    "salary": 1550,
    "dob": "20-16-1998",
    "status": "on"
}
```

- Response:

```json
{
    "_id": "5f19bdb34c88e40017f407b1",
    "firstname": "prakash",
    "lastname": "vivek",
    "email": "google@gmail.com",
    "salary": 1550,
    "dob": "20-16-1998",
    "status": "on",
    "__v": 0
}
```

## Login
> This fetch and allow employee to login
- **Endpoint:** `/login`
- **Method:** `POST`
- **Body:**

```json
{
    "email":"jjc@gmail.com"
}
```
- Response

```json


nodemonConfig

    "events": {
      "start": "cls||clear"
    }
