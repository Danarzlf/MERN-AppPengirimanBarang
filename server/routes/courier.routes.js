const express = require("express");
const {
    createCourier,
    updateCourier,
    getCourierById,
    getAllCouriers,
    deleteCourierById,

} = require("../controllers/courier.controller");

const router = express.Router();

router.post("/create-courier", createCourier);
router.put('/:courierId', updateCourier);
router.get('/:courierId', getCourierById);
router.get('/', getAllCouriers);
router.delete('/:courierId', deleteCourierById);


module.exports = router;
