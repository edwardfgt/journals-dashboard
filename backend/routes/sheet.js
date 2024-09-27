const express = require('express');
const router = express.Router();
const { getSheetDataController } = require('../controllers/sheetController');

router.get('/sheet-data', getSheetDataController);

module.exports = router;
