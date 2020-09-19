const express = require('express');
const { check, validationResult } = require('express-validator');
const logger = require('../../config/logger');
const router = express.Router();
const WebsitesService = require('./WebsitesService');
const WebsitesDB = require('./WebsitesDB');

/**
 * Process websites list.
 * @route {POST} api/websites
 */
router.post(
  '/',
  [check('websites', 'Websites list is required').not().isEmpty()],
  async (req, res) => {
    // Validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { websites } = req.body;

      const foundByHost = [];
      const foundByDomain = [];
      const notFound = [];

      for (const url of websites) {
        const host = WebsitesService.getHost(url);
        let website = await WebsitesDB.findByHost(host);
        if (website) {
          foundByHost.push(website);
        } else {
          const domain = WebsitesService.getDomain(host);
          website = await WebsitesDB.findByDomain(domain);
          if (website) {
            foundByDomain.push(website);
          } else {
            notFound.push(host);
          }
        }
      }

      return res.json({
        foundByHost,
        foundByDomain,
        notFound,
      });
    } catch (err) {
      logger.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
