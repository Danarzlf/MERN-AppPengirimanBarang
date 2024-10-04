const express = require("express");
const {
    createRecipient,
    updateRecipient,
    getAllRecipients

} = require("../controllers/recipient.controller");

const router = express.Router();

router.post("/create-recipients", createRecipient);
router.put('/:recipientId', updateRecipient);
router.get('/', getAllRecipients);

module.exports = router;
