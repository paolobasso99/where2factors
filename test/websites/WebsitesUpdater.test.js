process.env.NODE_ENV = 'test';
const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '../../.env.test') });

const { assert } = require('chai');
const WebsitesUpdater = require('../../components/websites/WebsitesUpdater');
const WebsitesDB = require('../../components/websites/WebsitesDB');

describe('WebsitesUpdater', function() {
  describe('getCategories', function() {
    it('getCategoriesYmlUrls() should return a non empty array', async function() {
      const ymlUrls = await WebsitesUpdater.getCategoriesYmlUrls();

      assert.isArray(ymlUrls);
      assert.isNotEmpty(ymlUrls);
    });

    it('getWebsitesFromYmlUrl(ymlUrl) should return a non empty array', async function() {
      const websites = await WebsitesUpdater.getCategoriesYmlUrls(
        'https://raw.githubusercontent.com/2factorauth/twofactorauth/master/_data/backup.yml'
      );

      assert.isArray(websites);
      assert.isNotEmpty(websites);
    });

    it('getWebsites() should return a non empty array', async function() {
      const websites = await WebsitesUpdater.getWebsites();

      assert.isArray(websites);
      assert.isNotEmpty(websites);
    });
  });

  describe('update', function() {
    it('should add websites to the database', async function() {
      // Update
      await WebsitesUpdater.update();

      // Check database
      const count = await WebsitesDB.countAll();
      assert.isNumber(count);
      assert.isAtLeast(1);
    });
  });
});
