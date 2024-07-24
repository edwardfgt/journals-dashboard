const express = require("express");
const router = express.Router();
const revenueController = require("../controllers/revenueController");

router.get("/total-revenue", revenueController.getTotalRevenue);
router.get("/client-revenue", revenueController.getClientRevenue);
router.get("/newsletter-revenue", revenueController.getNewsletterRevenue);

module.exports = router;
