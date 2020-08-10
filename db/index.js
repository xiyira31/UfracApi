const {Sequelize} = require('sequelize');
const db = require('../configs/database');

let connection = null;

const getConnection = () => {
  if (!connection) {
    try {
      connection = new Sequelize(
        db.database,
        db.username,
        db.password,
        db,
      );
    } catch (ex) {
      console.error(__filename, ex);
      process.exit(1);
    }
  }

  return connection;
};

module.exports = {
  getConnection
};