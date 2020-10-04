process.env.NODE_ENV = 'test';
const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '../.env.test') });
const { assert } = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const fs = require('fs');
const { after } = require('mocha');

const connectDB = require('../db/connectDB');
const disconnectDB = require('../db/disconnectDB');
const WebsitesUpdater = require('../components/websites/WebsitesUpdater');
const WebsitesDB = require('../components/websites/WebsitesDB');

describe('WebsitesUpdater', function () {
  describe('get websites from github', function () {
    afterEach(function () {
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
      assert.lengthOf(ymlUrls, 2);
      assert.equal(
        ymlUrls[0],
        'https://raw.githubusercontent.com/2factorauth/twofactorauth/master/_data/backup.yml'
      );
      assert.equal(
        ymlUrls[1],
        'https://raw.githubusercontent.com/2factorauth/twofactorauth/master/_data/banking.yml'
      );
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
      assert.lengthOf(websites, 2);
      await assert.hasAllDeepKeys(websites[0], ['name', 'url', 'img', 'tfa', 'category']);
      await assert.hasAllDeepKeys(websites[1], ['name', 'url', 'img', 'tfa', 'category']);
    });

    it('getWebsites() should return a non empty array', async function () {
      // Stub
      sinon
        .stub(WebsitesUpdater, 'getCategoriesYmlUrls')
        .resolves([
          'https://raw.githubusercontent.com/2factorauth/twofactorauth/master/_data/backup.yml',
        ]);
      const response = {
        data: fs.readFileSync('./test/twofactorauth.org/backup.yml'),
      };
      sinon.stub(axios, 'get').resolves(response);

      const websites = await WebsitesUpdater.getWebsites();

      assert.isArray(websites);
      assert.lengthOf(websites, 2);
      await assert.hasAllDeepKeys(websites[0], ['name', 'url', 'img', 'tfa', 'category']);
      await assert.hasAllDeepKeys(websites[1], ['name', 'url', 'img', 'tfa', 'category']);
    });
  });

  describe('update', function () {
    afterEach(async function () {
      sinon.restore();
    });

    it('should add websites to the database', async function () {
      // Stub getWebsites
      const mockWebsites = [
        {
          name: 'Example',
          url: 'https://www.example.com',
          category: 'example',
          img: 'example.png',
          tfa: ['method1', 'method2'],
        },
        {
          name: 'Example2',
          url: 'https://www.example2.com',
          category: 'example2',
          img: 'example2.png',
          tfa: ['method1', 'method2'],
        },
      ];
      sinon.stub(WebsitesUpdater, 'getWebsites').resolves([mockWebsites]);
      sinon.stub(WebsitesDB, 'addOrUpdate').resolves();

      // Stub database
      sinon.stub(connectDB);
      sinon.stub(disconnectDB);

      // Update
      await WebsitesUpdater.update();

      // Check database calls
      assert.equal(WebsitesDB.addOrUpdate.callCount, 2);
    });
  });
});
