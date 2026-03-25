const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.post('/data', dataController.createData);
router.get('/data', dataController.getLast50);
router.get('/latest', dataController.getLatest);
router.get('/data/:device_id', dataController.getDeviceHistory);

module.exports = router;
