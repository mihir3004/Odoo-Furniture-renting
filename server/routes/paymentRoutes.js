const express = require("express");
const paymentController = require("../controllers/paymentController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.get("/addPayment", paymentController.addPayment);

module.exports = router;
