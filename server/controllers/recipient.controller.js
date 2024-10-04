const Recipient = require("../models/recipient");
const Shipment = require("../models/shipment");

const createRecipient = async (req, res, next) => {
  try {
    const {
      name,
      phoneNumber,
      destinationCity,
      postCode,
      address,
      shipmentId,
      dropOffId,
    } = req.body;

    // Validate required fields
    if (!shipmentId || !name || !phoneNumber) {
      return res.status(400).json({
        status: false,
        message: "Shipment ID, name, and phone number are required.",
        data: null,
      });
    }

    // Check if shipment exists
    const existingShipment = await Shipment.findById(shipmentId);
    if (!existingShipment) {
      return res.status(404).json({
        status: false,
        message: "Shipment not found.",
        data: null,
      });
    }

    // Create new recipient record
    const newRecipient = await Recipient.create({
      name,
      phoneNumber,
      destinationCity,
      postCode,
      address,
      shipmentId,
    });

    res.status(201).json({
      status: true,
      message: "Recipient created successfully",
      data: newRecipient,
    });
  } catch (err) {
    next(err);
  }
};

const updateRecipient = async (req, res, next) => {
  try {
    const recipientId = req.params.recipientId; // Mengambil ID penerima dari parameter rute
    const updateData = req.body; // Data baru untuk diperbarui

    // Periksa apakah penerima ada
    const existingRecipient = await Recipient.findById(recipientId);
    if (!existingRecipient) {
      return res.status(404).json({
        status: false,
        message: "Recipient not found.",
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

    // Lakukan pembaruan pada penerima
    const updatedRecipient = await Recipient.findByIdAndUpdate(
      recipientId,
      updateData,
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Recipient updated successfully",
      data: updatedRecipient,
    });
  } catch (err) {
    next(err);
  }
};


const getAllRecipients = async (req, res, next) => {
  try {
    // Mengambil semua penerima dari koleksi Recipient
    const recipients = await Recipient.find();

    res.status(200).json({
      status: true,
      message: "Recipients retrieved successfully",
      data: recipients,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRecipient,
  updateRecipient,
  getAllRecipients
};
