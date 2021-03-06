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

      const found = [];
      const notFound = [];

      // Avoid checking duplicates
      const checkedHosts = [];

      for (let query of websites) {
        query = query.trim();

        if (query.length > 0) {
          const host = WebsitesService.getHost(query);

          if (!checkedHosts.includes(host)) {
            checkedHosts.push(host);

            const domain = WebsitesService.getDomain(host);

            let website = false;
            if (host) {
              website = await WebsitesDB.findBy("host", host);
            }

            if (!website && domain) {
              website = await WebsitesDB.findBy("domain", domain);
            }

            if (website) {
              found.push(website);
            } else {
              notFound.push(host);
            }
          }
        }
      }

      return res.json({
        found,
        notFound,
      });
    } catch (err) {
      logger.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
