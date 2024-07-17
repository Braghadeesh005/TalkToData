// mysqlConnection.js
const mysql = require('mysql');

let connection;

const createConnection = (config) => {
  connection = mysql.createConnection(config);
  return connection;
};

const connectToDatabase = (config) => {
  return new Promise((resolve, reject) => {
    const conn = createConnection(config);
    conn.connect((err) => {
      if (err) {
        return reject(err);
      }
      console.log("Connected with User's Mysql DB");
      resolve(conn);
    });
  });
};

const getConnection = () => {
  if (!connection) {
    throw new Error('Connection has not been established yet.');
  }
  return connection;
};

module.exports = { createConnection, connectToDatabase, getConnection };
