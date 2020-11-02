require('dotenv').config();
const WebsitesUpdater = require('./components/websites/WebsitesUpdater');

//const websitesUpdater = new WebsitesUpdater();

const argv = require('yargs');

argv
  .usage('$0 command')
  .command('update', 'update websites database', () => WebsitesUpdater.update())
  .demand(1, 'must provide a valid command')
  .help('h')
  .alias('h', 'help').argv;
