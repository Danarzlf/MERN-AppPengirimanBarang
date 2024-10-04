const express = require("express");
const router = express.Router();
const {
  createCostEstimation,
  getCostEstimationById,
  deleteCostEstimation,
  getAllCostEstimations,
  updateCostEstimationById,
  estimateCost,
  estimateCostByCityName,
} = require("../controllers/costEstimation.controller");


router.post("/", createCostEstimation);
router.get("/", getAllCostEstimations);
router.get("/:id", getCostEstimationById);
router.put("/:id", updateCostEstimationById);
router.delete("/:id", deleteCostEstimation);

router.post('/estimateCost', estimateCost);
router.post('/estimateCostByCityName', estimateCostByCityName);

module.exports = router;
