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

      for (const query of websites) {
        const host = WebsitesService.getHost(query);
        const domain = WebsitesService.getDomain(host);

        let website = false;
        if(host) {
          website = await WebsitesDB.findByHost(host);
        }

        if (!website && domain) {
          website = await WebsitesDB.findByDomain(domain);
        }

        if(website) {
          website.query = query;
          found.push(website);
        } else {
          notFound.push(query);
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
