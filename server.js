const path = require('path'); // ensure that the codes works correctly across different operating systems
const express = require('express');
const session = require('express-session'); // 'express-session' must be used together with 'connect-session-sequelize' library to handle user sessions in Express.js application, using Sequelize database as the session store
const SequelizeStore = require('connect-session-sequelize')(session.Store); // class that extends the express-session's 'Store' class and provides a way to store session data in a Sequelize-managed database.
const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'sCrTv267*-?', // TODO: how to put the secret in .env instead of hardcoding here
  cookie: {},
  resave: false, // don't save session if unmodified
  saveUninitialized: true, // don't create session until something is stored
  store: new SequelizeStore({
    db: sequelize
  }),
}

app.use(session(sess));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // construct file paths that are platform-independent

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});