require('dotenv').config();

const express = require('express');
const app = express();

const environments = require('./configs/environments');
const routes = require('./routes');

app.use('/', routes);

app.listen(environments.PORT || 3000);