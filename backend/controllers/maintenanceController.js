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
  const { equipmentName, issue } = req.body;

  try {
    const request = new Maintenance({ equipmentName, issue });
    await request.save();
    res.status(201).json({ message: 'Maintenance request created successfully!', request });
  } catch (error) {
    res.status(500).json({ message: 'Error creating maintenance request', error: error.message });
  }
};

module.exports = { getAllMaintenanceRequests, createMaintenanceRequest };
