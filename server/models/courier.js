const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courierSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    licensePlate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Courier = mongoose.model("Courier", courierSchema);

module.exports = Courier;
