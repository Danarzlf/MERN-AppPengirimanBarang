const midtransClient = require('midtrans-client');
const Payment = require('../models/payment');
const Shipment = require('../models/shipment');
const User = require('../models/user');

// Inisialisasi Midtrans
const snap = new midtransClient.Snap({
  isProduction: false, // Ubah ke true jika di production
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

// Membuat transaksi pembayaran terkait dengan Shipment
const createPayment = async (req, res, next) => {
  try {
    const { userId, shipmentId, amount } = req.body;

    // Validasi userId, shipmentId, dan jumlah pembayaran
    if (!userId || !shipmentId || !amount) {
      return res.status(400).json({
        status: false,
        message: 'User ID, Shipment ID, and amount are required.',
        data: null,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'User not found.',
        data: null,
      });
    }

    const shipment = await Shipment.findById(shipmentId);
    if (!shipment) {
      return res.status(404).json({
        status: false,
        message: 'Shipment not found.',
        data: null,
      });
    }

    // Cek apakah sudah ada pembayaran untuk userId dan shipmentId yang sama
    const existingPayment = await Payment.findOne({ userId, shipmentId });
    if (existingPayment) {
      // Jika sudah ada pembayaran, kembalikan redirect_url yang ada
      // const redirectUrl = `https://app.midtrans.com/snap/v4/redirection/${existingPayment.tokenRedirect}#/payment-list`;
      const redirectUrl = `https://app.sandbox.midtrans.com/snap/v4/redirection/${existingPayment.tokenRedirect}#/payment-list`;
      return res.status(200).json({
        status: true,
        message: 'Payment already exists',
        data: { redirect_url: redirectUrl },
      });
    }

    const orderId = `ORDER-${Date.now()}`;

    // Parameter transaksi untuk Midtrans
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,  
      },
      customer_details: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    // Simpan informasi pembayaran ke dalam database
    const payment = await Payment.create({
      orderId,
      shipmentId,
      userId,
      amount, // Ini adalah jumlah yang dikenakan
      status: 'pending',
      paymentType: null,
      tokenRedirect: transaction.token,
      transactionTime: new Date(),
    });

    res.status(201).json({
      status: true,
      message: 'Payment created successfully',
      data: { payment, redirect_url: transaction.redirect_url },
    });
  } catch (error) {
    next(error);
  }
};



const handlePaymentNotification = async (req, res, next) => {
  try {
    // Log request body untuk debugging
    console.log("Received notification:", req.body);
  
    let notification = {
      currency: req.body.currency,
      fraud_status: req.body.fraud_status,
      gross_amount: req.body.gross_amount,
      order_id: req.body.order_id,
      payment_type: req.body.payment_type,
      status_code: req.body.status_code,
      status_message: req.body.status_message,
      transaction_id: req.body.transaction_id,
      transaction_status: req.body.transaction_status,
      transaction_time: req.body.transaction_time,
      settlement_time: req.body.settlement_time,
      merchant_id: req.body.merchant_id,
    };
    
    // Panggil API notifikasi Midtrans
    let data = await snap.transaction.notification(notification);
    console.log("Midtrans response:", data);
    
    // Cek dan update status pembayaran di database
    const payment = await Payment.findOne({ orderId: notification.order_id });
    if (!payment) {
      console.error("Payment not found for orderId:", notification.order_id);
      return res.status(404).json({ status: false, message: 'Payment not found' });
    }
  
    // Update status pembayaran
    payment.status = notification.transaction_status;
    payment.settlement_time = notification.settlement_time;
    payment.paymentType = notification.payment_type;
    await payment.save();
  
    res.status(200).json({ status: true, message: 'Payment status updated successfully' });
  } catch (error) {
    next(error);
  }
};




module.exports = {
  createPayment,
  handlePaymentNotification

};
