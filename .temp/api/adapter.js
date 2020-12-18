'use strict';

import { Db } from 'mongodb';
import { Server } from 'mongodb';
const mongo = require('mongodb');
const dbPort = 27017;
const dbHost = 'localhost';
const dbName = 'employee';

// var DataBase = function () {
// };

function DataBase() {
}

DataBase.GetDB = () => {
  if (typeof DataBase.db === 'undefined') {
    DataBase.InitDB();
  }
  return DataBase.db;
}

DataBase.InitDB = function () {
  DataBase.db = new Db(dbName, new Server(dbHost, dbPort, {}, {}), { safe: false, auto_reconnect: true });

  DataBase.db.open(function (e, d) {
    if (e) {
      console.log(e);
    } else {
      console.log('connected to database :: ' + dbName);
    }
  });
}

DataBase.Disconnect = function () {
  if (DataBase.db) {
    DataBase.db.close();
  }
}

DataBase.BsonIdFromString = function (id) {
  var BSON = mongo.BSONPure;
  return new BSON.ObjectID(id);
}

exports = module.exports = DataBase;
