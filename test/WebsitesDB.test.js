process.env.NODE_ENV = 'test';
const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '../.env.test') });

const { assert } = require('chai');
const WebsitesDB = require('../components/websites/WebsitesDB');

const connectDB = require('../config/connectDB');
const disconnectDB = require('../config/disconnectDB');

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

describe('WebsitesDB: addOrUpdate', async () => {
  it('should add a new website to the database', async () => {
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
    assert.equal(added.tfa, website.tfa);
    assert.equal(added.exception, website.exception);
    assert.equal(added.status, website.status);
  });

  it('should update the website', async () => {
    // Update
    website.name = 'changed';
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
    assert.equal(added.tfa, website.tfa);
    assert.equal(added.exception, website.exception);
    assert.equal(added.status, website.status);
  });
});
