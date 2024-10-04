const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dropPointSchema = new Schema(
  {
    city: {
      type: String,
      required: true,
    },
    branch_name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    link_map: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_At', updatedAt: 'updated_At' } } // Use custom names for timestamp fields
);

const DropPoint = mongoose.model("DropPoint", dropPointSchema);

module.exports = DropPoint;
