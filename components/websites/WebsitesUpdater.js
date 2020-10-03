const axios = require('axios');
const YAML = require('yaml');
const logger = require('../../config/logger');
const WebsitesDB = require('./WebsitesDB');
const WebsitesService = require('./WebsitesService');
const connectDB = require('../../db/connectDB');
const disconnectDB = require('../../db/disconnectDB');

/**
 * The website object returned by GitHub.
 * @typedef {object} website
 * @property {string} name The name of the website.
 * @property {string} url The url of the website.
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
 * WebsitesUpdater class, used to start the websites database update process.
 */
class WebsitesUpdater {
  /**
   * Start updating the websites.
   * @static
   * @async
   */
  static async update() {
    // Get websites
    try {
      logger.info('Starting websites updating');
      const websites = await WebsitesUpdater.getWebsites();

      // Update websites in DB
      await connectDB();

      const promises = [];
      logger.info('Updating websites in the database');
      for (const website of websites) {
        if (website && website.url) {
          website.host = WebsitesService.getHost(website.url);
          website.domain = WebsitesService.getDomain(website.host);

          try {
            const promise = WebsitesDB.addOrUpdate(website);
            promises.push(promise);
          } catch (error) {
            logger.error(error);
          }
        }
      }

      // Close DB when done updating
      await Promise.all(promises);
      await disconnectDB();
      logger.info('Websites updating completed');
    } catch (error) {
      logger.log(error);
    }
  }

  /**
   * Get the websites objects from GitHub.
   * @static
   * @async
   * @return {Array<website>} The array of websites objects.
   * @throws {Error} Throw new Error if unable to get the websites.
   */
  static async getWebsites() {
    try {
      const categoriesYmlUrls = await WebsitesUpdater.getCategoriesYmlUrls();

      if (categoriesYmlUrls) {
        const promises = [];

        logger.info('Getting websites from yml files');
        for (const ymlUrl of categoriesYmlUrls) {
          const newWebsitesPromise = WebsitesUpdater.getWebsitesFromYmlUrl(
            ymlUrl
          );
          promises.push(newWebsitesPromise);
        }

        try {
          const websites = await Promise.all(promises);

          // Merge categories
          return await websites.reduce((accumulator, current) => {
            return accumulator.concat(current);
          }, []);
        } catch (error) {
          logger.error(error);
        }
      }
    } catch (error) {
      logger.log(error);
    }

    throw new Error('Unable to get websites');
  }

  /**
   * Parse yml file to get the websites objects.
   * Example url: https://raw.githubusercontent.com/2factorauth/twofactorauth/master/_data/backup.yml.
   * @static
   * @async
   * @param {string} ymlUrl The yml file url.
   * @return {Array<website>} The array of website objects.
   * @throws {Error} Throw new Error if unable to get the websites.
   */
  static async getWebsitesFromYmlUrl(ymlUrl) {
    try {
      logger.debug('Getting websites from yml: ' + ymlUrl);
      const response = await axios.get(ymlUrl, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (response.data) {
        const websites = YAML.parse(response.data).websites;

        // Fix image url and category
        if (websites && websites.length > 0) {
          const category = ymlUrl
            .substring(ymlUrl.lastIndexOf('/') + 1)
            .replace('.yml', '');
          for (const website of websites) {
            website.category = category;
            website.img =
              'https://raw.githubusercontent.com/2factorauth/twofactorauth/master/img/' + category + '/' + website.img;
          }

          return websites;
        }

        return [];
      }
    } catch (error) {
      logger.error(error);
    }

    throw new Error(
      'Unable to get websites from the yml at the url: ' + ymlUrl
    );
  }

  /**
   * Get the yml files urls from GitHub.
   * See https://api.github.com/repos/2factorauth/twofactorauth/contents/_data.
   * @static
   * @async
   * @throws {Error} Throw new Error if unable to get the categories urls.
   * @return {Array<string>} The array of urls pointing the yml files.
   */
  static async getCategoriesYmlUrls() {
    try {
      logger.info('Getting categories yml files');
      const response = await axios.get(
        'https://api.github.com/repos/2factorauth/twofactorauth/contents/_data',
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (response.data && response.data.length > 0) {
        return response.data.map((category) => {
          return category.download_url;
        });
      }
    } catch (error) {
      logger.error(error);
    }

    throw new Error('Unable to get categories yml urls from GitHub.');
  }
}

module.exports = WebsitesUpdater;
