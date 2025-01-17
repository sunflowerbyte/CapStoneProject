const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({
  equipmentId: { type: Number, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], required: true },
},
{ timestamps: true } // Automatically includes createdAt and updatedAt fields
);
module.exports = mongoose.model('Maintenance', MaintenanceSchema);
