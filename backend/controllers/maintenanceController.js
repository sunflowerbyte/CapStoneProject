const Maintenance = require('../models/Maintenance');

// Get all maintenance requests
const getAllMaintenanceRequests = async (req, res) => {
  try {
    const requests = await Maintenance.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching maintenance requests', error: error.message });
  }
};

// Create a new maintenance request
const createMaintenanceRequest = async (req, res) => {
  try {
    const { equipmentId, description, priority } = req.body;

    // Validate input
    if (!equipmentId || !description || !priority) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new maintenance request
    const newRequest = new Maintenance({
      equipmentId,
      description,
      priority,
      status: "Pending", // Default status
    });

    // Save to the database
    const savedRequest = await newRequest.save();

    res.status(201).json({
      message: "Maintenance request created successfully",
      data: savedRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create maintenance request",
      error: error.message,
    });
  }
};


module.exports = { getAllMaintenanceRequests, createMaintenanceRequest };
