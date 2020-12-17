# ems-mean
Employee Management nodejs mongoose/expressjs/angularjs/nodejs

npm install --save dotenv express cors body-parser mongoose
npm install --save-dev nodemon babel-cli babel-preset-env babel-preset-stage-3

npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill

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
