const express = require('express');
const router = express.Router();

const requests = require('./requests');
const files = require('./files');

router.use('/requests', requests);
router.use('/files', files);

module.exports = router;