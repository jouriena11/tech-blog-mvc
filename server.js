const path = require('path'); // ensure that the codes works correctly across different operating systems
const express = require('express');
const session = require('express-session'); // 'express-session' must be used together with 'connect-session-sequelize' library to handle user sessions in Express.js application, using Sequelize database as the session store
const SequelizeStore = require('connect-session-sequelize')(session.Store); // class that extends the express-session's 'Store' class and provides a way to store session data in a Sequelize-managed database.
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  // TODO: secret_session in .env is not passed to server.js
  // secret: process.env.SESSION_SECRET,
  secret: "sCrTv267**", 
  cookie: {
    maxAge: 300000*5, // 15 min
    httpOnly: true, // cookie can only be accessed by the server and is not accessible by client-side scripts running in the browser. This helps to prevent cross-site scripting (XSS) attacks.
    secure: false, // cookie can also be sent over http connection (i.e. not limited to just https)
    sameSite: 'strict', // 'strict' means cookie will only be sent to the server for requests that originate from the same site as the server
  },
  resave: false, // don't save session if unmodified
  saveUninitialized: true, // don't create session until something is stored
  store: new SequelizeStore({
    db: sequelize
  }),
}

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // construct file paths that are platform-independent

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});