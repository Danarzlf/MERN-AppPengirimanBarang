const mongoose = require("mongoose");

const ShippingRateSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  shippingCost: {
    type: Number,
    required: true,
  },
});

const ShippingRate = mongoose.model("ShippingRate", ShippingRateSchema);

module.exports = ShippingRate;
