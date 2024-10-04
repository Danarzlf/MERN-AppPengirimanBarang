const express = require('express');
const router = express.Router();
const costController = require('../controllers/cost.controller');

router.post('/', costController.getCost);
router.get('/city', costController.getCity);
router.get('/province', costController.getProvince);

module.exports = router;
