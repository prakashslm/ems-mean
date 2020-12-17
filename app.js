'use strict';

import express from 'express';
import { connect, connection } from 'mongoose';
import { json, urlencoded } from 'body-parser';
import cor from 'cors';
require('dotenv').config();

import { config } from './api/config';
import { EmpController } from './api/routes/employee';

const app = express();
const connectionstring = process.env.DATABASE_URL || config.db;

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // autoReconnect: true,
  // readPreference: 'primaryPreferred',
  // useFindAndModify: false,
};

connect(connectionstring, connectOptions).then(
  (d) => {
    console.log(`Connected to Database v${d.version}`);
  },
  (error) => {
    console.log('Error connectiong to the database' + error);
    process.exit(1);
  }
);

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cor());

app.use((req, res, next) => {
  res.setHeader('x-powered-by', 'EMS'); // app.disable('x-powered-by');
  console.log('Time:', Date.now());
  next();
});

app.use('/api', EmpController);

app.get('/', (req, res) => {
  return res.json({
    message: 'Welcome'
  });
});

app.get('*', (req, res) => {
  return res.sendFile(__dirname + '/public/views/index.html');
});

const emoji = ['💩', '👯‍', '😸', '🏄', '🚀', '🔥', '🎉', '😄', '🦁', '📋', '✅', '🌴'];

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('✅ Server listening on port 4000.');
});

const cleanup = () => {
  connection.close(() => {
    console.log('💩 Mongoose disconnected on app termination');
    process.exit(0);
  });
};
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
