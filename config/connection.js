const Sequelize = require('sequelize');
// const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

// const sessionStore = new SequelizeStore({
//   db: sequelize,
//   table: 'Session',
//   secret: process.env.SESSION_SECRET,
// });

module.exports = sequelize;