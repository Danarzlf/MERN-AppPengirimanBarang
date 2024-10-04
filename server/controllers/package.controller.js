const Package = require("../models/package");
const Shipment = require("../models/shipment");

const createPackage = async (req, res, next) => {
  try {
    const {
      type,
      itemName,
      quantity,
      itemValue,
      weight,
      height,
      width,
      remarks,
      shipmentId,
      length,
    } = req.body;

    // Validate required fields
    if (!shipmentId || !itemName || !weight) {
      return res.status(400).json({
        status: false,
        message: "Shipment ID, type, item name, and weight are required.",
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

    // Create new package record
    const newPackage = await Package.create({
      type,
      itemName,
      quantity,
      itemValue,
      weight,
      height,
      width,
      remarks,
      length,
      shipmentId,
    });

    res.status(201).json({
      status: true,
      message: "Package created successfully",
      data: newPackage,
    });
  } catch (err) {
    next(err);
  }
};

const updatePackage = async (req, res, next) => {
  try {
    const packageId = req.params.packageId; // Mengambil ID paket dari parameter rute
    const updateData = req.body; // Data baru untuk diperbarui

    // Periksa apakah paket ada
    const existingPackage = await Package.findById(packageId);
    if (!existingPackage) {
      return res.status(404).json({
        status: false,
        message: "Package not found.",
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

    // Lakukan pembaruan pada paket
    const updatedPackage = await Package.findByIdAndUpdate(
      packageId,
      updateData,
      {
        new: true,
      }
    );

    res.status(200).json({
      status: true,
      message: "Package updated successfully",
      data: updatedPackage,
    });
  } catch (err) {
    next(err);
  }
};

const getAllPackages = async (req, res, next) => {
  try {
    // Mengambil semua paket dari koleksi Package
    const packages = await Package.find();

    res.status(200).json({
      status: true,
      message: "Packages retrieved successfully",
      data: packages,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPackage,
  updatePackage,
  getAllPackages
};
