const Website = require('./WebsiteModel');
const logger = require('../../config/logger');

/**
 * The website object returned by GitHub.
 * @typedef {object} websiteObj
 * @property {string} name The name of the website.
 * @property {string} url The url of the website.
 * @property {string} host The host of the website.
 * @property {string} domain The domain of the website.
 * @property {string} [twitter] The twitter id of the website if it doesn't support tfa.
 * @property {string} [facebook] The facebook id of the website if it doesn't support tfa.
 * @property {string} [email_address] The email address of the website if it doesn't support tfa.
 * @property {string} img The logo of the website
 * @property {string} [doc] The link to the documentation on how to enable tfa in the website.
 * @property {Array<string>} [tfa] The available tfa methods.
 * @property {string} [exception] A note about this website.
 * @property {string} [status] The link to the tfa status of the website if it doesn't support tfa.
 */

/**
 * Website database wrapper class.
 */
class WebsiteDB {
  /**
   * Add or update a website to the connected mongoose database.
   * @static
   * @async
   * @return {void}
   * @param {websiteObj} websiteObj The website object.
   */
  static async addOrUpdate(websiteObj) {
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
        logger.debug('Added ' + newWebsite.host);
      } catch (error) {
        logger.error(error);
      }
    } else {
      throw Error('No host specified for: ' + websiteObj.url);
    }
  }

  /**
   * Find a website by host.
   * @param {string} host The hostname.
   * @return {(websiteObj|boolean)} The websiteObj or false if no website is found.
   */
  static async findByHost(host) {
    try {
      const website = await Website.findOne({ host });
      if (website) {
        logger.debug(`Found website with the host ${host} in the database`);
        return website;
      }
    } catch (error) {
      logger.log(error);
    }

    logger.debug(`Found website with the host ${host} in the database`);
    return false;
  }

  /**
   * Find a website by domain.
   * @param {string} domain The domain.
   * @return {(websiteObj|boolean)} The websiteObj or false if no website is found.
   */
  static async findByDomain(domain) {
    try {
      const website = await Website.findOne({ domain });
      if (website) {
        logger.debug(`Found website with the domain ${domain} in the database`);
        return website;
      }
    } catch (error) {
      logger.log(error);
    }

    logger.debug(`No website with the domain ${domain} in the database`);
    return false;
  }

  /**
   * Delete all websites in the connected database.
   * @static
   * @async
   * @return {object} Data about the operation.
   * @throws {Error} Throws new Error if unable to delete the documents.
   */
  static async deleteAll() {
    try {
      const result = await Website.deleteMany({});
      logger.debug('Successfuly delete all websites from the database');
      return result;
    } catch (error) {
      logger.log(error);
    }

    throw Error('Unable to delete all documents in the database');
  }

  /**
   * Count all websites in the connected database.
   * @static
   * @async
   * @return {number} The number of websites.
   * @throws {Error} Throws new Error if unable to count the documents.
   */
  static async countAll() {
    try {
      const result = await Website.countDocuments({});
      logger.debug(
        'Successfuly counted all websites in the database: ' + result
      );
      return result;
    } catch (error) {
      logger.log(error);
    }

    throw Error('Unable to count all documents in the database');
  }
}

module.exports = WebsiteDB;
