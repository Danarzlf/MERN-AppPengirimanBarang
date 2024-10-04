const express = require("express");
const {
  createPackage,
  updatePackage,
  getAllPackages
} = require("../controllers/package.controller"); // Mengimpor fungsi-fungsi dari controller package

const router = express.Router();

router.post("/create-packages", createPackage); // Mengarahkan permintaan POST ke fungsi createPackage
router.put("/:packageId", updatePackage); // Mengarahkan permintaan PUT ke fungsi updatePackage
router.get("/", getAllPackages); // Mengarahkan permintaan PUT ke fungsi updatePackage

module.exports = router;
