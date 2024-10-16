const express = require("express");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");
const {
  createShipment,
  getShipmentById,
  deleteShipment,
  getAllShipments,
  updateShipmentById,
  getShipmentByNoTrack,
} = require("../controllers/shipment.controller");
const apiLimiter = require("../middlewares/rateLimit");

const router = express.Router();

// Hapus penggunaan apiLimiter secara global
// router.use(apiLimiter); 

// Terapkan apiLimiter hanya pada rute yang diinginkan
router.post("/create-shipments", apiLimiter, createShipment);
router.get("/:id", getShipmentById);
router.delete("/:id", deleteShipment);
router.get("/", Auth, checkRole(["User", "Admin"]), getAllShipments);
router.put("/:id", updateShipmentById);
router.get('/track/:noTrack', getShipmentByNoTrack);

module.exports = router;
