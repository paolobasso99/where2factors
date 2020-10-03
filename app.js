require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors')
const logger = require('./config/logger');
const connectDB = require('./db/connectDB');

// DB
connectDB();

const app = express();

// Morgan log
app.use(morgan('common', { stream: logger.stream }));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost',
  optionsSuccessStatus: 200
}))

// Error handler
app.use((err, req, res, next) => {
  logger.error('Internal Server Error');
  res.status(500).send('500. Internal Server Error');
  next();
});

// Routes
const websitesAPI = require('./components/websites/websitesAPI');
app.use('/api/websites', websitesAPI);

module.exports = app;
