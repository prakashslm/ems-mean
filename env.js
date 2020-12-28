import dotenv from 'dotenv';

const env = process.env.NODE_ENV;
// const path = require('path');
console.log(`Testing for: ${env} ${__dirname}`);

try {
  switch (env) {
    case 'undefined':
      Error('Environment undefined, if local in terminal: export NODE_ENV=development');
      break;
    case 'development':
      dotenv.config({
        path: './dev.env'
      });
      break;
    case 'production':
      dotenv.config({
        path: './prod.env'
      });
      break;
    default:
      Error('Unrecognized Environment');
  }
} catch (err) {
  Error('Error trying to run file');
}

/*
const env = process.env.NODE_ENV || "development"

const configs = {
    base: {
        env,
        host: '0.0.0.0',
        port: 3000,
        dbPort: 3306,
        secret: "secretKey for sessions",
        dialect: 'mysql',
        issuer : 'Mysoft corp',
        subject : 'some@user.com',
    },
    development: {
        port: 3000,
        dbUser: 'root',
        dbPassword: 'root',
    },
    smoke: {
        port: 3000,
        dbUser: 'root',
    },
    integration: {
        port: 3000,
        dbUser: 'root',
    },
    production: {
        port: 3000,
        dbUser: 'root',
    }
};

const config = Object.assign(configs.base, configs[env]);

module.exports= config;
*/
