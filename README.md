# ems-mean
Employee Management nodejs mongoose/expressjs/angularjs/nodejs

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






-P, --save-prod
-D, --save-dev
-O, --save-optional
--no-save
-E, --save-exact
-B, --save-bundle

set path=%path%;C:\mongodb\bin

mongo bookapi-test

    "esm": "^3.2.25",
    "mocha": "^8.2.1",

    "@babel/runtime": "^7.12.5",
    "express-session": "^1.17.1", --save

    "@babel/plugin-transform-runtime": "^7.12.10",
    "@babel/preset-es2015": "^7.12.10",
    "@babel/register": "^7.12.10",


nodemonConfig

    "execMap": {},
    "ext": ".js,.mjs",
    "events": {
      "start": "cls||clear"
    }


.babelrc
  "ignore": [
    "*/node_modules",
    "*/tests/**/*.test.js"
  ]

    "serve": "node --inspect --experimental-modules app.mjs",
    "start1": "nodemon app.js --exec \"babel-node src --presets @babel/preset-env\"",
    "build1": "rimraf dist/ && babel ./client --out-dir ./dist/ --ignore ./node_modules,./.babelrc,./package.json,./npm-debug.log --copy-files",
    "lint1": "eslint ./app --ext .js",

    "prebuild2": "rm -rf public dist && mkdir public",
    "build2": "babel . --source-maps -d dist --ignore tests/*",
    "lint2": "eslint --no-ignore -f checkstyle .",
    "test1": "mocha --require esm --recursive --timeout 200 tests/**/*Tests.js --exit",
    "pretest1": "babel tests/*.spec.mjs --source-maps -d dist/tests",
    "test2": "mocha tests/*.spec.mjs",

.mocharc.json
{
  "package": "./package.json",
  "color": true,
  "diff": true,
  "recursive": true,
  "watch": false,
  "exit": true,
  "parallel": false,
  "require": [
    "@babel/register",
    "./tests/setup.js"
  ],
  "reporter": "spec",
  "spec": "*/*.spec.js",
  "grep": "./tests/*.(test|spec).m?js",
  "slow": 45,
  "timeout": 2000,
  "ui": "bdd",
  "extension": [
    "js",
    "mjs"
  ],
  "watch-files": [
    "./tests/*.test.js",
    "./tests/*.spec.js",
    "./tests/**/*Tests.js"
  ],
  "watch-ignore": [
    "./node_modules",
    "./.temp"
  ],
  "exclude": [
    "./node_modules",
    "./.temp"
  ]
}

https://app.pluralsight.com/library/courses/node-js-express-rest-web-services-update/table-of-contents
http://howtonode.org/express-mongodb
https://github.com/electron/electron-api-demos
