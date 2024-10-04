const City = require("../models/city");

const createCity = async (req, res, next) => {
  try {
    const { nameCity, province } = req.body;

    // Validate required fields
    if (!nameCity || !province) {
      return res.status(400).json({
        status: false,
        message: "City name and province are required.",
        data: null,
      });
    }

    // Create new city record
    const newCity = await City.create({
      nameCity,
      province,
    });

    res.status(201).json({
      status: true,
      message: "City created successfully",
      data: newCity,
    });
  } catch (err) {
    next(err);
  }
};

const updateCity = async (req, res, next) => {
  try {
    const cityId = req.params.cityId;
    const updateData = req.body;

    // Check if city exists
    const existingCity = await City.findById(cityId);
    if (!existingCity) {
      return res.status(404).json({
        status: false,
        message: "City not found.",
        data: null,
      });
    }

    // Update city
    const updatedCity = await City.findByIdAndUpdate(
      cityId,
      updateData,
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "City updated successfully",
      data: updatedCity,
    });
  } catch (err) {
    next(err);
  }
};

const getCityById = async (req, res, next) => {
  try {
    const cityId = req.params.cityId;

    // Check if city exists
    const existingCity = await City.findById(cityId);
    if (!existingCity) {
      return res.status(404).json({
        status: false,
        message: "City not found.",
        data: null,
      });
    }

    res.status(200).json({
      status: true,
      message: "City retrieved successfully",
      data: existingCity,
    });
  } catch (err) {
    next(err);
  }
};

const getAllCities = async (req, res, next) => {
  try {
    const cities = await City.find();

    res.status(200).json({
      status: true,
      message: "Cities retrieved successfully",
      data: cities,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCityById = async (req, res, next) => {
  try {
    const cityId = req.params.cityId;

    // Check if city exists
    const existingCity = await City.findById(cityId);
    if (!existingCity) {
      return res.status(404).json({
        status: false,
        message: "City not found.",
        data: null,
      });
    }

    // Delete city
    await City.findByIdAndDelete(cityId);

    res.status(200).json({
      status: true,
      message: "City deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCity,
  updateCity,
  getCityById,
  getAllCities,
  deleteCityById,
};
