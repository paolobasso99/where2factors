const mongoose = require('mongoose');

module.exports = async () => {
  try {
    return await mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};
