const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema(
  {
    type: {
      type: String,
    },
    itemName: {
      type: String,
    },
    quantity: {
      type: String,
    },
    itemValue: {
      type: String,
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },
    length: {
      type: Number,
    },
    width: {
      type: Number,
    },
    remarks: {
      type: String,
    },
    shipmentId: {
      type: Schema.Types.ObjectId,
      ref: "Shipment",
    },
  },
  { timestamps: { createdAt: "created_At", updatedAt: "updated_At" } }
);

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
