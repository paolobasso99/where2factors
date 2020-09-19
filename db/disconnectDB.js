const mongoose = require('mongoose');
const logger = require('../config/logger');

module.exports = async () => {
  try {
    logger.debug('Disconnecting from the database');
    await mongoose.disconnect();
    logger.info('Successfuly disconnected from the database');
  } catch (error) {
    logger.error(error);
  }
};
