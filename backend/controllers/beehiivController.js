const axios = require("axios");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

const publications = [
  {
    name: process.env.PUBLICATION_1_NAME,
    id: process.env.PUBLICATION_1_ID,
    token: process.env.PUBLICATION_1_TOKEN,
  },
  {
    name: process.env.PUBLICATION_2_NAME,
    id: process.env.PUBLICATION_2_ID,
    token: process.env.PUBLICATION_2_TOKEN,
  },
];

exports.getNewsletterStats = async (req, res) => {
  try {
    const results = await Promise.all(
      publications.map(async (pub) => {
        const response = await axios.get(
          `https://api.beehiiv.com/v2/publications/${pub.id}/subscriptions`,
          {
            headers: { Authorization: `Bearer ${pub.token}` },
            params: { status: "active" },
          }
        );
        return { name: pub.name, id: pub.id, data: response.data };
      })
    );

    res.json(results);
  } catch (error) {
    console.error("Error fetching newsletter stats:", error);
    res.status(500).json({ error: "Failed to fetch newsletter stats" });
  }
};
