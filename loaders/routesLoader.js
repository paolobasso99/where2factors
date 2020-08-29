const websitesAPI = require('../components/websites/websitesAPI');

module.exports = (app) => {
  app.use('/api/websites', websitesAPI);

  return app;
};
