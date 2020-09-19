process.env.NODE_ENV = 'test';
process.env.PORT = 3001;
const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '../../.env.test') });

const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
const server = require('../../bin/www');

chai.use(chaiHttp);

describe('websitesAPI', function() {
  describe('POST /api/websites', function() {
    it('should find websites and return them', async function() {
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

      assert.hasAllKeys(res.body, ['foundByHost', 'foundByDomain', 'notFound']);

      assert.isArray(res.body.foundByHost);
      assert.isArray(res.body.foundByDomain);
      assert.isArray(res.body.notFound);

      assert.lengthOf(res.body.foundByHost, 2);
      assert.lengthOf(res.body.foundByDomain, 1);
      assert.lengthOf(res.body.notFound, 1);
    });
  });
});
