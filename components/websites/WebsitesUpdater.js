const axios = require('axios');
const YAML = require('yaml');

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
      const websites = await WebsitesUpdater.getWebsites();

      // Update websites in DB
      await connectDB();

      const promises = [];
      for (const website of websites) {
        if (website && website.url) {
          const websiteObj = website;
          websiteObj.host = WebsitesService.getHost(websiteObj.url);
          websiteObj.domain = WebsitesService.getDomain(websiteObj.host);

          try {
            const promise = WebsitesDB.addOrUpdate(websiteObj);
            promises.push(promise);
          } catch (error) {
            console.error(error);
          }
        }
      }

      // Close DB when done updating
      await Promise.all(promises);
      await disconnectDB();
    } catch (error) {
      console.log(error);
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

        for (const ymlUrl of categoriesYmlUrls) {
          const newWebsitesPromise = WebsitesUpdater.getWebsitesFromYmlUrl(
            ymlUrl
          );
          promises.push(newWebsitesPromise);
        }

        try {
          const websites = await Promise.all(promises);

          // Merge categories
          return websites.reduce((accumulator, current) => {
            return accumulator.concat(current);
          }, []);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.log(error);
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
      const response = await axios.get(ymlUrl, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (response.data) {
        return YAML.parse(response.data).websites;
      }
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }

    throw new Error('Unable to get categories yml urls from GitHub.');
  }
}

module.exports = WebsitesUpdater;
