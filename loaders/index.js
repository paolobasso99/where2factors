const expressLoader = require('./expressLoader');
const routesLoader = require('./routesLoader');

module.exports = (app) => {
  expressLoader(app);

  routesLoader(app);

  return app;
};
