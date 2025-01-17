const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  consumableId: { type: Number, required: true },
  quantity: { type: Number, required: true },
  status:{type:String, enum:["Urgent", "Routine"], default:"Urgent"}
},
{ timestamps: true } // Automatically includes createdAt and updatedAt fields
);

module.exports = mongoose.model('Inventory', InventorySchema);
