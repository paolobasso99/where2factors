require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const connectDB = require('./db/connectDB');

// DB
connectDB();

const app = express();

// Morgan log
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => res.json({ message: 'Welcome to our Bookstore!' }));

const websitesAPI = require('./components/websites/websitesAPI');
app.use('/api/websites', websitesAPI);

module.exports = app;
