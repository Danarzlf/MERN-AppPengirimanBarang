const express = require("express");
const {
    distanceCost
} = require("../controllers/shippingRate.controller");

const router = express.Router();

router.post("/", distanceCost);


module.exports = router;
