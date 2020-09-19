process.env.NODE_ENV = 'test';
const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '../.env.test') });

const { assert } = require('chai');
const WebsitesDB = require('../components/websites/WebsitesDB');

const connectDB = require('../db/connectDB');
const disconnectDB = require('../db/disconnectDB');

const website = {
  name: 'Example',
  host: 'www.example.com',
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
      assert.equal(added.name, website.name);
      assert.equal(added.domain, website.domain);
      assert.equal(added.twitter, website.twitter);
      assert.equal(added.facebook, website.facebook);
      assert.equal(added.email_address, website.email_address);
      assert.equal(added.img, website.img);
      assert.equal(added.doc, website.doc);
      assert.isArray(added.tfa);
      assert.lengthOf(added.tfa, 2);
      assert.equal(added.exception, website.exception);
      assert.equal(added.status, website.status);
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
      assert.equal(added.name, website.name);
      assert.equal(added.domain, website.domain);
      assert.equal(added.twitter, website.twitter);
      assert.equal(added.facebook, website.facebook);
      assert.equal(added.email_address, website.email_address);
      assert.equal(added.img, website.img);
      assert.equal(added.doc, website.doc);
      assert.isArray(added.tfa);
      assert.lengthOf(added.tfa, 2);
      assert.equal(added.exception, website.exception);
      assert.equal(added.status, website.status);
    });
  });
});
