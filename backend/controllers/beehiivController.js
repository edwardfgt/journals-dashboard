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
  {
    name: process.env.PUBLICATION_3_NAME,
    id: process.env.PUBLICATION_3_ID,
    token: process.env.PUBLICATION_3_TOKEN,
  },
  {
    name: process.env.PUBLICATION_4_NAME,
    id: process.env.PUBLICATION_4_ID,
    token: process.env.PUBLICATION_4_TOKEN,
  },
  {
    name: process.env.PUBLICATION_5_NAME,
    id: process.env.PUBLICATION_5_ID,
    token: process.env.PUBLICATION_5_TOKEN,
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
    console.error(`Error fetching stats for ${pub.name}:`, error.message);
    res.status(500).json({ error: "Failed to fetch newsletter stats" });
  }
};
