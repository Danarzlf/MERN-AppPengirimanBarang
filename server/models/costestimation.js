const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const costEstimationSchema = new Schema(
  {
    from: {
      type: String,
   
    },
    to: {
      type: String,
  
    },
    weight: {
      type: String,
  
    },
    cost: {
      type: Number,

    },
    deliveryService: {
      type: String,
      enum: ['REGULER', 'NEXTDAY', 'CARGO', 'SAMEDAY'],
      // default: 'REGULER',
    },
    fromCity: { type: Schema.Types.ObjectId, ref: 'City' },
    toCity: { type: Schema.Types.ObjectId, ref: 'City' },
    // fromCity: { type: String, ref: 'City' },
    // toCity: { type: String, ref: 'City' },
  },
  { timestamps: true }
);

const CostEstimation = mongoose.model("CostEstimation", costEstimationSchema);

module.exports = CostEstimation;
