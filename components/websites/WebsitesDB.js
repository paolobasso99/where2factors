const Website = require('./websiteModel');
const connectDB = require('../../config/connectDB');

/**
 * @class WebsiteDB class.
 */
class WebsiteDB {
  constructor() {
    this.db = connectDB();
  }

  /**
   * Add or update
   * @param {*} websiteObj
   */
  async addOrUpdate(websiteObj) {
    const newWebsite = {
      name: websiteObj.name,
      host: websiteObj.host,
      domain: websiteObj.domain,
      twitter: websiteObj.twitter,
      facebook: websiteObj.facebook,
      email_address: websiteObj.email_address,
      img: websiteObj.img,
      doc: websiteObj.doc,
      tfa: websiteObj.tfa,
      exception: websiteObj.exception,
      status: websiteObj.status,
    };

    if (newWebsite.host) {
      try {
        // Find website by host
        await Website.replaceOne({ host: newWebsite.host }, newWebsite, {
          upsert: true,
        });
        console.log('Updated ' + newWebsite.host);
      } catch (error) {
        console.error(error);
      }
    } else {
      throw 'No host specified!';
    }
  }

  close() {
    this.db.disconnect();
  }
}

module.exports = WebsiteDB;
