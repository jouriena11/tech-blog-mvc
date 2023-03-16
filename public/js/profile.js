const usernameField = document.getElementById('username-input-field');
const passwordField = document.getElementById('username-input-field');
const firstNameField = document.getElementById('first-name-input-field');
const lastNameField = document.getElementById('last-name-input-field');
const emailField = document.getElementById('email-input-field');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const axios = require('axios');
