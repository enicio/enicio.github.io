require('dotenv').config();

const express = require('express');
const app = express();

const routes = require('./routes');

app.use('/', routes);

module.exports = app;