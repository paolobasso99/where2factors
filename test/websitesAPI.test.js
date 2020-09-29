process.env.NODE_ENV = 'test';
process.env.PORT = 3001;
const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '../.env.test') });

// Chai config
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);

const WebsitesDB = require('../components/websites/WebsitesDB');
const disconnectDB = require('../db/disconnectDB');
const connectDB = require('../db/connectDB');

const server = require('../bin/www');

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

describe('websitesAPI', function () {

  before(async function () {
    await connectDB();
    await WebsitesDB.deleteAll();
    await WebsitesDB.addOrUpdate(website);
  });

  after(async function () {
    server.close();
    await disconnectDB();
  });

  describe('POST /api/websites', function () {
    it('should find websites and return them', async function () {
      const res = await chai
        .request(server)
        .post('/api/websites')
        .send({
          websites: [
            'https://www.example.com/example?example=example',
            'https://www.notfound.com/',
          ],
        });

      assert.isObject(res);
      assert.equal(res.status, 200);

      assert.hasAllKeys(res.body, ['found', 'notFound']);

      assert.isArray(res.body.found);
      assert.isArray(res.body.notFound);

      assert.lengthOf(res.body.found, 1);
      assert.lengthOf(res.body.notFound, 1);

      await assert.deepNestedInclude(res.body.found[0], website)
    });
  });
});
