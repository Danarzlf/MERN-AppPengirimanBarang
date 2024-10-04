const express = require("express");
const router = express.Router();
const {
  createDropPoint,
  updateDropPoint,
  getDropPointById,
  getAllDropPoints,
  deleteDropPointById,
} = require("../controllers/dropPoint.controller");


router.post("/", createDropPoint);
router.put("/droppoints/:dropPointId", updateDropPoint);
router.get("/droppoints/:dropPointId", getDropPointById);
router.get("/", getAllDropPoints);
router.delete("/droppoints/:dropPointId", deleteDropPointById);

module.exports = router;
