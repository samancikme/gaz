const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  device_id: { type: String, required: true },
  gas: { type: Number, required: true },
  status: { type: String, required: true },
  lat: { type: Number },
  lng: { type: Number },
  battery: { type: Number },
  alarm: { type: Boolean, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Data', dataSchema);
