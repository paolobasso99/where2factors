const expressLoader = require('./expressLoader');
const mongooseLoader = require('./mongooseLoader');
const routesLoader = require('./routesLoader');

module.exports = (app) => {
  expressLoader(app);

  mongooseLoader(app);

  routesLoader(app);

  return app;
};
