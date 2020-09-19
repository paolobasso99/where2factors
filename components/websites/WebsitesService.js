const psl = require('psl');

/**
 * WebsitesService class with helper methods.
 */
class WebsitesService {
  /**
   * Extract the hostname from a full url.
   * @static
   * @param {string} url The url.
   * @return {string} The hostname.
   */
  static getHost(url) {
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
   * Extract the domain from a full hostname.
   * @static
   * @param {string} host The url.
   * @return {string} The domain.
   */
  static getDomain(host) {
    return psl.parse(host).domain;
  }
}

module.exports = WebsitesService;
