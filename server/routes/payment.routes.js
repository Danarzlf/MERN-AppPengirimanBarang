const express = require("express");
const {
    createPayment,
    updatePayment,
    getAllPayments

} = require("../controllers/payment.controller");

const router = express.Router();

router.post("/create-payment", createPayment);
router.put('/:paymentId', updatePayment);
router.get('/', getAllPayments);

module.exports = router;
