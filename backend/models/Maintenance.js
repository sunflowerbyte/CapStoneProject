const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({
  equipmentName: { type: String, required: true },
  issue: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  assignedTo: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Maintenance', MaintenanceSchema);
