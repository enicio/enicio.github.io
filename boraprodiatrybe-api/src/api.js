require('dotenv').config();

const cors = require('cors');
const express = require('express');

const { loadData } = require('./data/users');
loadData();
const app = express();

const routes = require('./routes');

app.use(cors());
app.use(express.json());

app.use('/', routes);

module.exports = app;
