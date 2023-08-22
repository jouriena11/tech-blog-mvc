const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
  {
    // host: '172.31.20.8',
    host: '13.211.203.123',
    dialect: 'mysql',
    // port: 3306,
    dialectOptions: {
      decimalNumbers: true,
    },
  }
);

module.exports = sequelize;