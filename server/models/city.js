const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema(
  {
    nameCity: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const City = mongoose.model("City", citySchema);

module.exports = City;
