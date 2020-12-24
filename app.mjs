'use strict';

const path = require('path');
import express from 'express';
import { connect, connection } from 'mongoose';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
// const dotenv = require('dotenv').config({ path: `.env.${(process.env.NODE_ENV || 'PROD').toLowerCase()}` });

const port = process.env.PORT || 3000;
const app = express();

import { Book } from './api/models/book-model';
import { routes } from './api/routes/book-route';

const bookRouter = routes(Book);

const config = {
  autoIndex: false,
  useNewUrlParser: true,

  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

console.log('-----------', process.env.NODE_ENV);
let connectionString = 'mongodb://localhost:27017/bookapi-test';

if (process.env.NODE_ENV === 'PROD') {
  console.log('This is a REAL PROD');
  connectionString = 'mongodb://localhost:27017/bookapi-prod';
}

connect(connectionString, config).then((d) => {
  console.log(`Connected to Database v${d.version}`);
}, (error) => {
  console.log('Error connectiong to the database' + error);
  process.exit(1);
});

app.use(json({ limit: '100mb' }));
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('x-powered-by', 'EMS'); // app.disable('x-powered-by');
  console.log('Time:', Date.now());
  next();
});

app.use('/api', bookRouter);

app.use('/js', express.static(__dirname + '/public/js'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/css', express.static(__dirname + '/public/css'));

app.all('/*', (req, res, next) => {
  res.sendFile('index.html', { root: __dirname + '/public' });
});

// app.use('/', express.static(path.join(__dirname, 'public')));
// app.get('/', (req, res) => res.send('Welcome to my Nodemon API !'));
// app.get('/', (req, res) => res.json({ ping: true }));

const emoji = ['💩', '👯‍', '😸', '🏄', '🚀', '🔥', '🎉', '😄', '🦁', '📋', '✅', '🌴', '🤷‍♂️', `🏃‍♀️`, '🔖'];

app.server = app.listen(port, () => {
  console.log(`✅ 🏃‍♀️ Server listening on port: ${port}`);
});

if (process.env.ENV !== 'TEST') {
  process.on('SIGTERM', shutDown);
  process.on('SIGINT', shutDown);
}

function shutDown(signal) {
  console.log(signal);
  app.server.close(() => {
    console.log('Express server disconnected on app termination');
    connection.close();
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
}
process.on('exit', function () {
  console.log('About to exit, waiting for remaining connections to complete');
});

let reporter = function (type, ...rest) {
  // remote reporter logic goes here
  console.error(type, rest);
};

process.on('uncaughtException', (err) => {
  reporter('uncaughtException', (new Date).toUTCString(), err.message, err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  reporter('unhandledRejection', (new Date).toUTCString(), reason.message || reason);
  process.exit(1);
});

module.exports = app;
