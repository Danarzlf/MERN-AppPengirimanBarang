const mongoose = require("mongoose");
const Shipment = require("../models/shipment");
const Sender = require("../models/sender");
const Courier = require("../models/courier");
const Recipient = require("../models/recipient");
const Package = require("../models/package");
const Service = require("../models/service");
const User = require("../models/user");
const Payment = require("../models/payment");

const createShipment = async (req, res, next) => {
  try {
    const { userId, noTrack, type, status, costShipment, methodPayment } = req.body;

    // Validate required fields
    if (!userId || !type) {
      return res.status(400).json({
        status: false,
        message: "All fields are required.",
        data: null,
      });
    }

    // Check if user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
        data: null,
      });
    }

    // Create new shipment record
    const newShipment = await Shipment.create({
      userId,
      noTrack,
      type,
      status,
      costShipment: 0,
      methodPayment,
    });

    res.status(201).json({
      status: true,
      message: "Shipment created successfully",
      data: newShipment,
    });
  } catch (err) {
    next(err);
  }
};

const getShipmentById = async (req, res, next) => {
  try {
    const shipmentId = req.params.id;

    // Find the Shipment by its ID
    const shipment = await Shipment.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(shipmentId) },
      },
      {
        $lookup: {
          from: "senders",
          localField: "_id",
          foreignField: "shipmentId",
          as: "sender",
        },
      },
      {
        $unwind: { path: "$sender", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "recipients",
          localField: "_id",
          foreignField: "shipmentId",
          as: "recipient",
        },
      },
      {
        $unwind: { path: "$recipient", preserveNullAndEmptyArrays: true },
      },
      // Lookup package
      {
        $lookup: {
          from: "packages",
          localField: "_id",
          foreignField: "shipmentId",
          as: "packages",
        },
      },
      // Lookup service
      {
        $lookup: {
          from: "services",
          localField: "serviceId",
          foreignField: "_id",
          as: "service",
        },
      },
      {
        $unwind: { path: "$service", preserveNullAndEmptyArrays: true },
      },
      // Lookup payment
      {
        $lookup: {
          from: "payments",
          localField: "_id",
          foreignField: "shipmentId",
          as: "payments",
        },
      },
      // Lookup courier
      {
        $lookup: {
          from: "couriers",
          localField: "courierId",
          foreignField: "_id",
          as: "courier",
        },
      },
      {
        $unwind: { path: "$courier", preserveNullAndEmptyArrays: true },
      },
    ]);

    if (shipment.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Shipment not found.",
        data: null,
      });
    }

    res.status(200).json({
      status: true,
      message: "Shipment found successfully.",
      data: {
        shipment: shipment[0],
      },
    });
  } catch (err) {
    next(err);
  }
};



const deleteShipment = async (req, res, next) => {
  try {
    const shipmentId = req.params.id;

    // Hapus data sender yang terkait
    await Sender.deleteMany({ shipmentId: shipmentId });

    // Hapus data recipient yang terkait
    await Recipient.deleteMany({ shipmentId: shipmentId });

    // Hapus data package yang terkait
    await Package.deleteMany({ shipmentId: shipmentId });

    // Hapus data service yang terkait
    await Service.deleteMany({ shipmentId: shipmentId });

    // Hapus pengiriman berdasarkan ID
    const deletedShipment = await Shipment.findByIdAndDelete(shipmentId);

    if (!deletedShipment) {
      return res.status(404).json({
        status: false,
        message: "Shipment not found.",
        data: null,
      });
    }

    res.status(200).json({
      status: true,
      message: "Shipment and related data deleted successfully.",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

const getAllShipments = async (req, res, next) => {
  try {
    const userId = req.user._id; // Asumsikan Anda sudah memiliki middleware untuk mengambil user ID dari JWT atau session

    // Find all Shipments with related data and filter by userId
    const shipments = await Shipment.aggregate([
      // Match berdasarkan userId
      {
        $match: { userId: userId }, // Filter berdasarkan userId
      },
      // Lookup sender
      {
        $lookup: {
          from: "senders",
          localField: "_id",
          foreignField: "shipmentId",
          as: "sender",
        },
      },
      {
        $unwind: { path: "$sender", preserveNullAndEmptyArrays: true },
      },
      // Lookup recipient
      {
        $lookup: {
          from: "recipients",
          localField: "_id",
          foreignField: "shipmentId",
          as: "recipient",
        },
      },
      {
        $unwind: { path: "$recipient", preserveNullAndEmptyArrays: true },
      },
      // Lookup package
      {
        $lookup: {
          from: "packages",
          localField: "_id",
          foreignField: "shipmentId",
          as: "packages",
        },
      },
      // Lookup service
      {
        $lookup: {
          from: "services",
          localField: "serviceId",
          foreignField: "_id",
          as: "service",
        },
      },
      {
        $unwind: { path: "$service", preserveNullAndEmptyArrays: true },
      },
      // Lookup payment
      {
        $lookup: {
          from: "payments",
          localField: "_id",
          foreignField: "shipmentId",
          as: "payments",
        },
      },
      // Lookup courier
      {
        $lookup: {
          from: "couriers",
          localField: "courierId",
          foreignField: "_id",
          as: "courier",
        },
      },
      {
        $unwind: { path: "$courier", preserveNullAndEmptyArrays: true },
      },
      // Group by shipment _id to remove duplicates
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          sender: { $first: "$sender" },
          recipient: { $first: "$recipient" },
          packages: { $first: "$packages" },
          service: { $first: "$service" },
          payments: { $first: "$payments" },
          courier: { $first: "$courier" },
          noTrack: { $first: "$noTrack" },
          type: { $first: "$type" },
          createdAt: { $first: "$createdAt" },
          // Tambahkan field lain yang Anda butuhkan
        },
      },
    ]);

    res.status(200).json({
      status: true,
      message: "Shipments retrieved successfully.",
      data: shipments,
    });
  } catch (err) {
    next(err);
  }
};

const updateShipmentById = async (req, res, next) => {
  try {
    const shipmentId = req.params.id;
    const { noTrack, type, status, courierId, serviceId, costShipment, methodPayment } = req.body;



    // Update shipment record
    const updatedShipment = await Shipment.findByIdAndUpdate(
      shipmentId,
      {
        noTrack,
        type,
        status,
        courierId,
        serviceId,
        costShipment,
        methodPayment,
      },
      { new: true } // to return the updated shipment
    );

    if (!updatedShipment) {
      return res.status(404).json({
        status: false,
        message: "Shipment not found.",
        data: null,
      });
    }

    res.status(200).json({
      status: true,
      message: "Shipment updated successfully",
      data: updatedShipment,
    });
  } catch (err) {
    next(err);
  }
};


const getShipmentByNoTrack = async (req, res, next) => {
  try {
    const { noTrack } = req.params;

    // Check if noTrack is provided
    if (!noTrack) {
      return res.status(400).json({
        status: false,
        message: "Tracking number is required.",
        data: null,
      });
    }

    // Find the Shipment by its noTrack
    const shipment = await Shipment.aggregate([
      {
        $match: { noTrack: noTrack }, // Match based on the noTrack value
      },
      {
        $lookup: {
          from: "senders",
          localField: "_id",
          foreignField: "shipmentId",
          as: "sender",
        },
      },
      {
        $unwind: { path: "$sender", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "recipients",
          localField: "_id",
          foreignField: "shipmentId",
          as: "recipient",
        },
      },
      {
        $unwind: { path: "$recipient", preserveNullAndEmptyArrays: true },
      },
      // Lookup package
      {
        $lookup: {
          from: "packages",
          localField: "_id",
          foreignField: "shipmentId",
          as: "packages",
        },
      },
      // Lookup service
      {
        $lookup: {
          from: "services",
          localField: "serviceId",
          foreignField: "_id",
          as: "service",
        },
      },
      {
        $unwind: { path: "$service", preserveNullAndEmptyArrays: true },
      },
      // Lookup payment
      {
        $lookup: {
          from: "payments",
          localField: "_id",
          foreignField: "shipmentId",
          as: "payments",
        },
      },
      // Lookup courier
      {
        $lookup: {
          from: "couriers",
          localField: "courierId",
          foreignField: "_id",
          as: "courier",
        },
      },
      {
        $unwind: { path: "$courier", preserveNullAndEmptyArrays: true },
      },
    ]);

    if (shipment.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Shipment not found.",
        data: null,
      });
    }

    res.status(200).json({
      status: true,
      message: "Shipment found successfully.",
      data: {
        shipment: shipment[0],
      },
    });
  } catch (err) {
    next(err);
  }
};




module.exports = {
  createShipment,
  getShipmentById,
  deleteShipment,
  getAllShipments,
  updateShipmentById,
  getShipmentByNoTrack,
};
