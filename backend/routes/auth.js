const express = require('express');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.post('/login', authenticate);

module.exports = router;