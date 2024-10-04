const express = require("express");
const router = express.Router();
const cityController = require("../controllers/city.controller");

// Routes untuk City
router.post("/", cityController.createCity);
router.get("/", cityController.getAllCities);
router.get("/:cityId", cityController.getCityById);
router.put("/:cityId", cityController.updateCity);
router.delete("/:cityId", cityController.deleteCityById);

module.exports = router;
