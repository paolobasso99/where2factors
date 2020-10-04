process.env.NODE_ENV = 'test';
const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '../.env.test') });
const { assert } = require('chai');

const WebsitesDB = require('../components/websites/WebsitesDB');
const connectDB = require('../db/connectDB');
const disconnectDB = require('../db/disconnectDB');

const website = {
  name: 'Example',
  url: 'https://www.example.com',
  host: 'www.example.com',
  category: 'example',
  domain: 'example.com',
  twitter: 'example',
  facebook: 'example',
  email_address: 'example',
  img: 'example.png',
  doc: 'https://example.com/doc',
  tfa: ['method1', 'method2'],
  exception: 'example',
  status: 'example',
};

/**
 * Here I will test the database wrapper class. 
 * Since this is the purpose it makes sense to NOT stub the database with sinon
 * but use a real test database instead.
 */
describe('WebsitesDB', function () {
  before(async function () {
    await connectDB();
    await WebsitesDB.deleteAll();
  });

  after(async function () {
    await disconnectDB();
  });

  describe('addOrUpdate', function () {
    it('should add a new website to the database', async function () {
      // Update
      await WebsitesDB.addOrUpdate(website);

      // Check database
      const added = await WebsitesDB.findByHost(website.host);
      const count = await WebsitesDB.countAll();

      assert.equal(count, 1);

      assert.isObject(added);
      await assert.deepNestedInclude(added, website);
    });

    it('should update the website', async function () {
      // Update
      website.name = 'changed';
      await WebsitesDB.addOrUpdate(website);

      // Check database
      const added = await WebsitesDB.findByDomain(website.domain);
      const count = await WebsitesDB.countAll();

      assert.equal(count, 1);

      assert.isObject(added);
      await assert.deepNestedInclude(added, website);
    });
  });
});
