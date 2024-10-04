const express = require("express");
const {
  createService,
  updateService,
  getServiceById,
  getAllServices,
  deleteServiceById
} = require("../controllers/service.controller");

const router = express.Router();

router.post("/create-service", createService);
router.put("/:serviceId", updateService);
router.get("/:serviceId", getServiceById);
router.get("/", getAllServices);
router.delete("/:serviceId", deleteServiceById);

module.exports = router;
