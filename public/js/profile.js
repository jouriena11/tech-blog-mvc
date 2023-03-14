const usernameEl = document.getElementById('username-input-field');
const passwordEl = document.getElementById('username-input-field');
const firstNameEl = document.getElementById('first-name-input-field');
const lastNameEl = document.getElementById('last-name-input-field');
const emailEl = document.getElementById('email-input-field');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const axios = require('axios');
