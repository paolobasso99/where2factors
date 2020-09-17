const mongoose = require('mongoose');

const { MONGO_URL } = process.env;

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

module.exports = async () => {
  try {
    return await mongoose.connect(MONGO_URL, options);
  } catch (error) {
    console.error(error);
  }
};
