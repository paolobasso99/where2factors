process.env.NODE_ENV = 'test';
const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '../.env.test') });

const { assert } = require('chai');
const WebsitesUpdater = require('../components/websites/WebsitesUpdater');
const WebsitesDB = require('../components/websites/WebsitesDB');

describe('WebsitesUpdater: extractHostname', () => {
  it('should return the correct hostname', () => {
    assert.equal(
      WebsitesUpdater.extractHostname('facebook.com'),
      'facebook.com'
    );
    assert.equal(
      WebsitesUpdater.extractHostname('subdomain.facebook.com'),
      'subdomain.facebook.com'
    );
    assert.equal(
      WebsitesUpdater.extractHostname('https://facebook.com/'),
      'facebook.com'
    );
    assert.equal(
      WebsitesUpdater.extractHostname('https://facebook.com/sdjfhkshf'),
      'facebook.com'
    );
    assert.equal(
      WebsitesUpdater.extractHostname(
        'https://facebook.com/sdjfhkshf?query1=value1&query2=value2'
      ),
      'facebook.com'
    );
    assert.equal(
      WebsitesUpdater.extractHostname('https://subdomain.facebook.com/'),
      'subdomain.facebook.com'
    );
    assert.equal(
      WebsitesUpdater.extractHostname(
        'https://subdomain.facebook.com/sdjfhkshf'
      ),
      'subdomain.facebook.com'
    );
    assert.equal(
      WebsitesUpdater.extractHostname(
        'https://subdomain.facebook.com/sdjfhkshf?query1=value1&query2=value2'
      ),
      'subdomain.facebook.com'
    );
  });
});

describe('WebsitesUpdater: getCategories', async () => {
  it('getCategoriesYmlUrls() should return a non empty array', async () => {
    const ymlUrls = await WebsitesUpdater.getCategoriesYmlUrls();

    assert.isArray(ymlUrls);
    assert.isNotEmpty(ymlUrls);
  });

  it('getWebsitesFromYmlUrl(ymlUrl) should return a non empty array', async () => {
    const websites = await WebsitesUpdater.getCategoriesYmlUrls(
      'https://raw.githubusercontent.com/2factorauth/twofactorauth/master/_data/backup.yml'
    );

    assert.isArray(websites);
    assert.isNotEmpty(websites);
  });

  it('getWebsites() should return a non empty array', async () => {
    const websites = await WebsitesUpdater.getWebsites();

    assert.isArray(websites);
    assert.isNotEmpty(websites);
  });
});

describe('WebsitesUpdater: update', () => {
  it('should add websites to the database', async () => {
    // Update
    await WebsitesUpdater.update();

    // Check database
    const count = await WebsitesDB.countAll();
    assert.isNumber(count);
    assert.isAtLeast(1);
  });
});
