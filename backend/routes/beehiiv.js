const express = require("express");
const router = express.Router();
const beehiivController = require("../controllers/beehiivController");

router.get("/stats", beehiivController.getNewsletterStats);

module.exports = router;
