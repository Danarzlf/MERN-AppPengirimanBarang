const express = require("express");
const {
    createSender,
    updateSender,
    getAllSenders

} = require("../controllers/sender.controller");

const router = express.Router();

router.post("/create-senders", createSender);
router.put('/:senderId', updateSender);
router.get('/', getAllSenders);

module.exports = router;
