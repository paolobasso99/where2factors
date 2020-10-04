process.env.NODE_ENV = 'test';
const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '../.env.test') });

const { assert } = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const fs = require('fs');
const connectDB = require('../db/connectDB');
const disconnectDB = require('../db/disconnectDB');
const WebsitesUpdater = require('../components/websites/WebsitesUpdater');
const WebsitesDB = require('../components/websites/WebsitesDB');
const { after } = require('mocha');

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

describe('WebsitesUpdater', function () {
  describe('get websites from github', function () {
    after(function () {
      sinon.restore();
    });

    it('getCategoriesYmlUrls() should return a non empty array', async function () {
      // Stub GitHub api
      const response = {
        data: JSON.parse(
          fs.readFileSync('./test/twofactorauth.org/categories.json')
        ),
      };
      sinon.stub(axios, 'get').resolves(response);

      const ymlUrls = await WebsitesUpdater.getCategoriesYmlUrls();

      assert.isArray(ymlUrls);
      assert.isNotEmpty(ymlUrls);
    });

    it('getWebsitesFromYmlUrl(ymlUrl) should return a non empty array', async function () {
      // Stub GitHub api
      const response = {
        data: fs.readFileSync('./test/twofactorauth.org/backup.yml'),
      };
      sinon.stub(axios, 'get').resolves(response);

      const websites = await WebsitesUpdater.getWebsitesFromYmlUrl(
        'https://raw.githubusercontent.com/2factorauth/twofactorauth/master/_data/backup.yml'
      );

      assert.isArray(websites);
      assert.isNotEmpty(websites);
    });

    it('getWebsites() should return a non empty array', async function () {
      const websites = await WebsitesUpdater.getWebsites();

      assert.isArray(websites);
      assert.isNotEmpty(websites);
    });
  });

  describe('update', function () {
    before(async function () {
      await connectDB();
      await WebsitesDB.deleteAll();
      await disconnectDB();
    });

    afterEach(async function () {
      await disconnectDB();
      sinon.restore();
    });

    it('should add websites to the database', async function () {
      sinon.stub(WebsitesUpdater, 'getWebsites').resolves([website]);

      // Update
      await WebsitesUpdater.update();

      // Check database
      await connectDB();
      const check = await WebsitesDB.findByHost('www.example.com');

      await assert.deepNestedInclude(check, website);
    });
  });
});
