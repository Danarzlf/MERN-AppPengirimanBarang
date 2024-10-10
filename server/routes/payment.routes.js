const express = require("express");
const {
    createPayment,
    handlePaymentNotification,

} = require("../controllers/payment.controller");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

const router = express.Router();


router.post('/', createPayment);
router.post("/webhook/midtrans", handlePaymentNotification);

module.exports = router;
