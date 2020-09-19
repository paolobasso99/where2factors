process.env.NODE_ENV = 'test';
const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '../.env.test') });

const { assert } = require('chai');
const WebsitesService = require('../components/websites/WebsitesService');

describe('WebsitesService', function() {
  describe('getHost', function() {
    it('should return the correct hostname', function() {
      assert.equal(WebsitesService.getHost('facebook.com'), 'facebook.com');
      assert.equal(
        WebsitesService.getHost('subdomain.facebook.com'),
        'subdomain.facebook.com'
      );
      assert.equal(
        WebsitesService.getHost('https://facebook.com/'),
        'facebook.com'
      );
      assert.equal(
        WebsitesService.getHost('https://facebook.com/sdjfhkshf'),
        'facebook.com'
      );
      assert.equal(
        WebsitesService.getHost(
          'https://facebook.com/sdjfhkshf?query1=value1&query2=value2'
        ),
        'facebook.com'
      );
      assert.equal(
        WebsitesService.getHost('https://subdomain.facebook.com/'),
        'subdomain.facebook.com'
      );
      assert.equal(
        WebsitesService.getHost('https://subdomain.facebook.com/sdjfhkshf'),
        'subdomain.facebook.com'
      );
      assert.equal(
        WebsitesService.getHost(
          'https://subdomain.facebook.com/sdjfhkshf?query1=value1&query2=value2'
        ),
        'subdomain.facebook.com'
      );
    });
  });

  describe('getDomain', function() {
    it('should return the correct domain', function() {
      assert.equal(WebsitesService.getDomain('example.com'), 'example.com');
      assert.equal(
        WebsitesService.getDomain('subdomain.example.com'),
        'example.com'
      );
      assert.equal(WebsitesService.getDomain('example.co.uk'), 'example.co.uk');
      assert.equal(
        WebsitesService.getDomain('subdomain.example.co.uk'),
        'example.co.uk'
      );
      assert.equal(
        WebsitesService.getDomain('a.b.c.example.co.uk'),
        'example.co.uk'
      );
    });
  });
});
