const DropPoint = require("../models/dropPoint");

const createDropPoint = async (req, res, next) => {
  try {
    const { city, branch_name, category, address, link_map } = req.body;

    // Validate required fields
    if (!city || !branch_name || !category || !address || !link_map) {
      return res.status(400).json({
        status: false,
        message: "All fields are required.",
        data: null,
      });
    }

    // Create new drop point record
    const newDropPoint = await DropPoint.create({
      city,
      branch_name,
      category,
      address,
      link_map,
    });

    res.status(201).json({
      status: true,
      message: "DropPoint created successfully",
      data: newDropPoint,
    });
  } catch (err) {
    next(err);
  }
};

const updateDropPoint = async (req, res, next) => {
  try {
    const dropPointId = req.params.dropPointId; // Mengambil ID drop point dari parameter rute
    const updateData = req.body; // Data baru untuk diperbarui

    // Periksa apakah drop point ada
    const existingDropPoint = await DropPoint.findById(dropPointId);
    if (!existingDropPoint) {
      return res.status(404).json({
        status: false,
        message: "DropPoint not found.",
        data: null,
      });
    }

    // Lakukan pembaruan pada drop point
    const updatedDropPoint = await DropPoint.findByIdAndUpdate(
      dropPointId,
      updateData,
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "DropPoint updated successfully",
      data: updatedDropPoint,
    });
  } catch (err) {
    next(err);
  }
};

const getDropPointById = async (req, res, next) => {
  try {
    const dropPointId = req.params.dropPointId; // Retrieve the drop point ID from the route parameters

    // Check if the drop point exists
    const existingDropPoint = await DropPoint.findById(dropPointId);
    if (!existingDropPoint) {
      return res.status(404).json({
        status: false,
        message: "DropPoint not found.",
        data: null,
      });
    }

    res.status(200).json({
      status: true,
      message: "DropPoint retrieved successfully",
      data: existingDropPoint,
    });
  } catch (err) {
    next(err);
  }
};

const getAllDropPoints = async (req, res, next) => {
  try {
    // Mengambil semua drop point dari koleksi DropPoint
    const dropPoints = await DropPoint.find();

    res.status(200).json({
      status: true,
      message: "DropPoints retrieved successfully",
      data: dropPoints,
    });
  } catch (err) {
    next(err);
  }
};

const deleteDropPointById = async (req, res, next) => {
  try {
    const dropPointId = req.params.dropPointId; // Retrieve the drop point ID from the route parameters

    // Check if the drop point exists
    const existingDropPoint = await DropPoint.findById(dropPointId);
    if (!existingDropPoint) {
      return res.status(404).json({
        status: false,
        message: "DropPoint not found.",
        data: null,
      });
    }

    // Delete the drop point
    await DropPoint.findByIdAndDelete(dropPointId);

    res.status(200).json({
      status: true,
      message: "DropPoint deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createDropPoint,
  updateDropPoint,
  getDropPointById,
  getAllDropPoints,
  deleteDropPointById,
};
