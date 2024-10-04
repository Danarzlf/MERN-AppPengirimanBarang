const Courier = require("../models/courier");
const Shipment = require("../models/shipment");

const createCourier = async (req, res, next) => {
  try {
    const { name, phoneNumber, vehicleType, licensePlate} =
      req.body;

    // Validate required fields
    if (!name || !phoneNumber) {
      return res.status(400).json({
        status: false,
        message: "Shipment ID, name, and phone number are required.",
        data: null,
      });
    }

    // Create new courier record
    const newCourier = await Courier.create({
      name,
      phoneNumber,
      vehicleType,
      licensePlate,
    });

    res.status(201).json({
      status: true,
      message: "Courier created successfully",
      data: newCourier,
    });
  } catch (err) {
    next(err);
  }
};

const updateCourier = async (req, res, next) => {
  try {
    const courierId = req.params.courierId; // Mengambil ID kurir dari parameter rute
    const updateData = req.body; // Data baru untuk diperbarui

    // Periksa apakah kurir ada
    const existingCourier = await Courier.findById(courierId);
    if (!existingCourier) {
      return res.status(404).json({
        status: false,
        message: "Courier not found.",
        data: null,
      });
    }

    // Lakukan pembaruan pada kurir
    const updatedCourier = await Courier.findByIdAndUpdate(
      courierId,
      updateData,
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Courier updated successfully",
      data: updatedCourier,
    });
  } catch (err) {
    next(err);
  }
};

const getCourierById = async (req, res, next) => {
  try {
    const courierId = req.params.courierId; // Retrieve the courier ID from the route parameters

    // Check if the courier exists
    const existingCourier = await Courier.findById(courierId);
    if (!existingCourier) {
      return res.status(404).json({
        status: false,
        message: "Courier not found.",
        data: null,
      });
    }

    res.status(200).json({
      status: true,
      message: "Courier retrieved successfully",
      data: existingCourier,
    });
  } catch (err) {
    next(err);
  }
};

const getAllCouriers = async (req, res, next) => {
  try {
    // Mengambil semua kurir dari koleksi Courier
    const couriers = await Courier.find();

    res.status(200).json({
      status: true,
      message: "Couriers retrieved successfully",
      data: couriers,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCourierById = async (req, res, next) => {
  try {
    const courierId = req.params.courierId; // Retrieve the courier ID from the route parameters

    // Check if the courier exists
    const existingCourier = await Courier.findById(courierId);
    if (!existingCourier) {
      return res.status(404).json({
        status: false,
        message: "Courier not found.",
        data: null,
      });
    }

    // Delete the courier
    await Courier.findByIdAndDelete(courierId);

    res.status(200).json({
      status: true,
      message: "Courier deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};



module.exports = {
  createCourier,
  updateCourier,
  getCourierById,
  getAllCouriers,
  deleteCourierById,
};
