const { getSheetData } = require('../services/googleSheetService');

async function getSheetDataController(req, res) {
  try {
    const data = await getSheetData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getSheetDataController };
