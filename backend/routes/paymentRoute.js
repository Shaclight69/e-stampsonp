const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
  getSubscriptions,
  SubsPayment,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

router.route("/prices").get(isAuthenticatedUser, getSubscriptions);

router.route("/session").post(isAuthenticatedUser, SubsPayment);

module.exports = router;
