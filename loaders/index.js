const connectDB = require('../config/connectDB');
const expressLoader = require('./expressLoader');
const routesLoader = require('./routesLoader');

module.exports = async (app) => {
  await connectDB();

  expressLoader(app);
  routesLoader(app);

  return app;
};
