import { Db, BSONPure, Server } from 'mongoose';

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
};

DataBase.InitDB = () => {
  DataBase.db = new Db(dbName, new Server(dbHost, dbPort, {}, {}), {
    safe: false, auto_reconnect: true
  });

  DataBase.db.open((e, d) => {
    if (e) {
      console.log(e);
    } else {
      console.log('connected to database :: ' + dbName);
    }
  });
};

DataBase.Disconnect = () => {
  if (DataBase.db) {
    DataBase.db.close();
  }
};

DataBase.BsonIdFromString = (id) => {
  return new BSONPure.ObjectID(id);
};

exports = module.exports = DataBase;
