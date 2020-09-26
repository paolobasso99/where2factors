process.env.NODE_ENV = 'test';
process.env.PORT = 3001;
const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '../.env.test') });

// Chai config
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);

const disconnectDB = require('../db/disconnectDB');
const connectDB = require('../db/connectDB');

const server = require('../bin/www');

describe('websitesAPI', function () {

  before(async function () {
    await connectDB();
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
            'https://www.udemy.com/user/edit-account/fd<script>lool</script>',
            'https://zxvczx.adobe.com/',
            'https://mail.google.com/',
            'https://withouuuutt.ausfdygfyuoasgfsgf.com/',
          ],
        });

      assert.isObject(res);
      assert.equal(res.status, 200);

      assert.hasAllKeys(res.body, ['found', 'notFound']);

      assert.isArray(res.body.found);
      assert.isArray(res.body.notFound);

      assert.lengthOf(res.body.found, 3);
      assert.lengthOf(res.body.notFound, 1);
    });
  });
});
