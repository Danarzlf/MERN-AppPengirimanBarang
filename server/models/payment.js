const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    shipmentId: { type: Schema.Types.ObjectId, ref: 'Shipment', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      default: 'pending',
    },
    paymentType: { type: String, trim: true }, // e.g., credit_card, bank_transfer
    transactionTime: { type: Date },
    settlement_time: { type: Date },
    tokenRedirect: { type: String, trim: true },
    transactionId: { type: String, trim: true },
  },
  { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
