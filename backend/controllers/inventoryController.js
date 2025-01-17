const Inventory = require("../models/Inventory");

// Get all inventory items
const getAllInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching inventory", error: error.message });
  }
};

// Add a new inventory item
const addInventoryItem = async (req, res) => {
  const { consumableId, quantity, status } = req.body;

  //Required fields
  if (!consumableId || !quantity || !status) {
    return res.status(400).json({ message: "All fields are required." });
  }

  //Data type validation
  if (typeof quantity !== "number" || quantity <= 0) {
    return res.status(400).json({
      message: "Quantity must be a positive number.",
    });
  }

  try {
    const item = new Inventory({
      consumableId,
      quantity,
      status: status || "Urgent",
    });

    const savedItem = await item.save();

    res
      .status(201)
      .json({ message: "Inventory item added successfully!", data: savedItem });
  } catch (error) {
    console.error("Error adding inventory item:", error);
    res
      .status(500)
      .json({ message: "Error adding inventory item", error: error.message });
  }
};

module.exports = { getAllInventory, addInventoryItem };
