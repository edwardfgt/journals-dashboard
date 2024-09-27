const totalRevenueData = require("../data/totalRevenueData.json");
  

exports.getTotalRevenue = (req, res) => {
  res.json(totalRevenueData);
};

exports.getClientRevenue = (req, res) => {
  const combinedClientData = totalRevenueData.dates.map((date, index) => ({
    date,
    "Client A": totalRevenueData.clientA[index],
    "Client B": totalRevenueData.clientB[index],
    Total: totalRevenueData.clientA[index] + totalRevenueData.clientB[index],
  }));
  res.json(combinedClientData);
};

exports.getNewsletterRevenue = (req, res) => {
  const { getSheetData } = require('../services/googleSheetService');
  const convertGoogleSheetsData = require('../services/formatSheetService');

  const fetchAndFormatSheetData = async () => {
    try {
      const rawSheetData = await getSheetData();
      const formattedData = convertGoogleSheetsData(rawSheetData);
      return formattedData;
    } catch (error) {
      console.error('Error fetching or formatting sheet data:', error);
      throw error;
    }
  };

  fetchAndFormatSheetData()
    .then(newsletterData => {
      res.json(newsletterData);
    })
    .catch(error => {
      console.error('Error in getNewsletterRevenue:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
};
