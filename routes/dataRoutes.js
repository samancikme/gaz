const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Authentication middleware removed for full access
// const requireAuth = require('../middleware/auth');
// router.use(requireAuth);

router.post('/data', dataController.createData);
router.get('/data', dataController.getLast50Records);
router.get('/data/:device_id', dataController.getDeviceHistory);
router.get('/latest', dataController.getLatestRecord);

module.exports = router;
