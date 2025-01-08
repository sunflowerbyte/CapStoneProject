const express = require('express');
const {
  getAllMaintenanceRequests,
  createMaintenanceRequest,
} = require('../controllers/maintenanceController');
const router = express.Router();

router.get('/', getAllMaintenanceRequests);
router.post('/', createMaintenanceRequest);

module.exports = router;
