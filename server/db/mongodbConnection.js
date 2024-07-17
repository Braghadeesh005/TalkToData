// mongodbConnection.js
const mongoose = require('mongoose');

const connections = {};

const connectToDatabase2 = (connectionString) => {
  if (!connections[connectionString]) {
    const userConnection = mongoose.createConnection(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    connections[connectionString] = userConnection;
  }
  console.log("Connected with user's mongodb ");
  return connections[connectionString];
};

module.exports = { connectToDatabase2 };
