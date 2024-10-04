// Mengganti impor model Sender dengan model Service
const Service = require("../models/service");
const Shipment = require("../models/shipment");

const createService = async (req, res, next) => {
  try {
    const { nameServices, price, description} = req.body;

    // Validasi field yang diperlukan
    if (!nameServices || !price) {
      return res.status(400).json({
        status: false,
        message: "Shipment ID, service name, and price are required.",
        data: null,
      });
    }

    // Buat catatan layanan baru
    const newService = await Service.create({
      nameServices,
      price,
      description,
    });

    res.status(201).json({
      status: true,
      message: "Service created successfully",
      data: newService,
    });
  } catch (err) {
    next(err);
  }
};

const updateService = async (req, res, next) => {
  try {
    const serviceId = req.params.serviceId; // Mengambil ID layanan dari parameter rute
    const updateData = req.body; // Data baru untuk diperbarui

    // Periksa apakah kurir ada
    const existingService = await Service.findById(serviceId);
    if (!existingService) {
      return res.status(404).json({
        status: false,
        message: "Service not found.",
        data: null,
      });
    }


    // Lakukan pembaruan pada layanan
    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      updateData,
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (err) {
    next(err);
  }
};

const getServiceById = async (req, res, next) => {
  try {
    const serviceId = req.params.serviceId; // Retrieve the service ID from the route parameters

    // Check if the service exists
    const existingService = await Service.findById(serviceId);
    if (!existingService) {
      return res.status(404).json({
        status: false,
        message: "Service not found.",
        data: null,
      });
    }

    res.status(200).json({
      status: true,
      message: "Service retrieved successfully",
      data: existingService,
    });
  } catch (err) {
    next(err);
  }
};

const getAllServices = async (req, res, next) => {
  try {
    // Mengambil semua layanan dari koleksi Service
    const services = await Service.find();

    res.status(200).json({
      status: true,
      message: "Services retrieved successfully",
      data: services,
    });
  } catch (err) {
    next(err);
  }
};

const deleteServiceById = async (req, res, next) => {
  try {
    const serviceId = req.params.serviceId; // Mengambil ID layanan dari parameter rute

    // Periksa apakah layanan ada
    const existingService = await Service.findById(serviceId);
    if (!existingService) {
      return res.status(404).json({
        status: false,
        message: "Service not found.",
        data: null,
      });
    }

    // Hapus layanan
    await Service.findByIdAndDelete(serviceId);

    res.status(200).json({
      status: true,
      message: "Service deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  createService,
  updateService,
  getServiceById,
  getAllServices,
  deleteServiceById
};
