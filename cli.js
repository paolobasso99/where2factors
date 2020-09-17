require('dotenv').config();
const WebsitesUpdater = require('./components/websites/WebsitesUpdater');

//const websitesUpdater = new WebsitesUpdater();

const argv = require('yargs')
  .usage('$0 command')
  .command('update', 'update websites database', (argv) =>
    WebsitesUpdater.update()
  )
  .demand(1, 'must provide a valid command')
  .help('h')
  .alias('h', 'help').argv;
