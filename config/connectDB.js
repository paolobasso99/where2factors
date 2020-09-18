const mongoose = require('mongoose');

const { MONGO_URL } = process.env;

const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

module.exports = async () => {
  try {
    return await mongoose.connect(MONGO_URL, options);
  } catch (error) {
    console.error(error);
  }
};
