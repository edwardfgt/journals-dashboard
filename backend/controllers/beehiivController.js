const axios = require("axios");
const dotenv = require("dotenv");
const express = require("express");
const { fetchNewsletterData } = require("../services/beehiivService");

dotenv.config();

const publications = [
  {
    name: process.env.PUBLICATION_1_NAME,
    id: process.env.PUBLICATION_1_ID,
    token: process.env.PUBLICATION_1_TOKEN,
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
  {
    name: process.env.PUBLICATION_6_NAME,
    id: process.env.PUBLICATION_6_ID,
    token: process.env.PUBLICATION_6_TOKEN,
  },
  {
    name: process.env.PUBLICATION_7_NAME,
    id: process.env.PUBLICATION_7_ID,
    token: process.env.PUBLICATION_7_TOKEN,
  }
];

exports.getNewsletterStats = async (req, res) => {
  try {
    const results = await Promise.all(
      publications.map(fetchNewsletterData)
    );
    res.json(results);
  } catch (error) {
    console.error(`Error fetching newsletter data:`, error.message);
    res.status(500).json({ error: "Failed to fetch newsletter data" });
  }
};
