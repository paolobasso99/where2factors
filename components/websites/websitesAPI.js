const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// @route    POST api/websites
// @desc     Process a list of websites
router.post(
  '/',
  [check('list', 'Websites list is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      return res.json('Hellooo');
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
