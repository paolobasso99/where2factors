const mongoose = require('mongoose');
const logger = require('../config/logger');

const { MONGO_URL } = process.env;

const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

module.exports = async () => {
  try {
    logger.debug('Connecting to the database');
    const db = await mongoose.connect(MONGO_URL, options);
    logger.info('Successfuly connected to the database');
    return db;
  } catch (error) {
    logger.error(error);
  }
};
