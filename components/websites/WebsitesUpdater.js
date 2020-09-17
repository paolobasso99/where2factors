const axios = require('axios');
const YAML = require('yaml');
const psl = require('psl');

const WebsitesDB = require('./WebsitesDB');

/**
 * @class WebsitesUpdater class.
 */
class WebsitesUpdater {
  /**
   * Start updating the database
   */
  static async update() {
    const websitesDB = new WebsitesDB();

    // Get websites
    const websites = await WebsitesUpdater.getWebsites();

    // Update websites in DB
    const promises = [];
    for (const website of websites) {
      if (website && website.url) {
        const websiteObj = website;
        websiteObj.host = WebsitesUpdater.extractHostname(websiteObj.url);
        websiteObj.domain = psl.parse(websiteObj.host).domain;

        try {
          const promise = websitesDB.addOrUpdate(websiteObj);
          promises.push(promise);
        } catch (error) {
          console.error(error);
        }
      }
    }

    // Close DB when done updating
    await Promise.all(promises);
    websitesDB.close();
  }

  static extractHostname(url) {
    let hostname;
    // find & remove protocol (http, ftp, etc.) and get hostname
    if (url.indexOf('//') > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }

    // find & remove port number
    hostname = hostname.split(':')[0];
    // find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
  }

  /**
   * Get the websites objects
   */
  static async getWebsites() {
    const categoriesYmlsUrls = await WebsitesUpdater.getCategoriesYmlsUrls();

    if (categoriesYmlsUrls) {
      const promises = [];

      for (const ymlUrl of categoriesYmlsUrls) {
        const newWebsitesPromise = WebsitesUpdater.getWebsitesFromYmlUrl(
          ymlUrl
        );
        promises.push(newWebsitesPromise);
      }

      const websites = await Promise.all(promises);

      // Merge categories
      return websites.reduce((accumulator, current) => {
        return accumulator.concat(current);
      }, []);
    }

    throw 'Unable to get websites from GitHub.';
  }

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

    return false;
  }

  static async getCategoriesYmlsUrls() {
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

    return false;
  }
}

module.exports = WebsitesUpdater;
