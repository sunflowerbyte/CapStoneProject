const Inventory = require('../models/Inventory');

// Get all inventory items
const getAllInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory', error: error.message });
  }
};

// Add a new inventory item
const addInventoryItem = async (req, res) => {
  const { itemName, quantity, unit } = req.body;

  try {
    const item = new Inventory({ itemName, quantity, unit });
    await item.save();
    res.status(201).json({ message: 'Inventory item added successfully!', item });
  } catch (error) {
    res.status(500).json({ message: 'Error adding inventory item', error: error.message });
  }
};

module.exports = { getAllInventory, addInventoryItem };
