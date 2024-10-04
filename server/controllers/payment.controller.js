const Payment = require("../models/payment");
const Shipment = require("../models/shipment");

const createPayment = async (req, res, next) => {
  try {
    const { shipmentId, amount, payment_method } = req.body;

    // Validate required fields
    if (!shipmentId || !amount || !payment_method) {
      return res.status(400).json({
        status: false,
        message: "shipment ID, amount, and payment method are required.",
        data: null,
      });
    }

    // Check if shipment exists
    const existingShipment = await Shipment.findById(shipmentId);
    if (!existingShipment) {
      return res.status(404).json({
        status: false,
        message: "shipment not found.",
        data: null,
      });
    }

    // Create new payment record
    const newPayment = await Payment.create({
      shipmentId,
      amount,
      payment_method,
    });

    res.status(201).json({
      status: true,
      message: "Payment created successfully",
      data: newPayment,
    });
  } catch (err) {
    next(err);
  }
};

const updatePayment = async (req, res, next) => {
  try {
    const paymentId = req.params.paymentId; // Mengambil ID pembayaran dari parameter rute
    const updateData = req.body; // Data baru untuk diperbarui

    // Periksa apakah pembayaran ada
    const existingPayment = await Payment.findById(paymentId);
    if (!existingPayment) {
      return res.status(404).json({
        status: false,
        message: "Payment not found.",
        data: null,
      });
    }

    // Periksa apakah ada perubahan yang diminta pada pengiriman terkait
    if (updateData.shipmentId) {
      // Periksa apakah pengiriman yang diminta ada
      const existingShipment = await Shipment.findById(updateData.shipmentId);
      if (!existingShipment) {
        return res.status(404).json({
          status: false,
          message: "Shipment not found.",
          data: null,
        });
      }
    }

    // Lakukan pembaruan pada pembayaran
    const updatedPayment = await Payment.findByIdAndUpdate(paymentId, updateData, {
      new: true,
    });

    res.status(200).json({
      status: true,
      message: "Payment updated successfully",
      data: updatedPayment,
    });
  } catch (err) {
    next(err);
  }
};

const getAllPayments = async (req, res, next) => {
  try {
    // Mengambil semua pembayaran dari koleksi Payment
    const payments = await Payment.find();

    res.status(200).json({
      status: true,
      message: "Payments retrieved successfully",
      data: payments,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPayment,
  updatePayment,
  getAllPayments
};
