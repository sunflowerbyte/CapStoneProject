const express = require('express');
const { getAllInventory, addInventoryItem } = require('../controllers/inventoryController');
const router = express.Router();

router.get('/', getAllInventory);
router.post('/', addInventoryItem);

module.exports = router;
