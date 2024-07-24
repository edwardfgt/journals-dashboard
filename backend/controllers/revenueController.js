const totalRevenueData = require("../data/totalRevenueData.json");
const client1Data = require("../data/client1Data.json");
const client2Data = require("../data/client2Data.json");

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
  const newsletterData = [
    { data: client1Data, title: "Newsletter 1" },
    { data: client2Data, title: "Newsletter 2" },
  ];
  res.json(newsletterData);
};
