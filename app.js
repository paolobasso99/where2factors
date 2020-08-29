const express = require('express');
const load = require('./loaders');

const app = express();

load(app);

module.exports = app;
