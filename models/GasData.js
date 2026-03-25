const mongoose = require('mongoose');

const gasDataSchema = new mongoose.Schema(
    {
        device_id: { type: String, required: true },
        gas: { type: Number, required: true },
        gas_digital: { type: Number, default: 0, enum: [0, 1] },
        voltage: { type: Number, default: 0 },
        percent: { type: Number, default: 0 },
        status: { type: String, enum: ['normal', 'warning', 'danger'], default: 'normal' },
        alarm: { type: Boolean, default: false },
        gps_valid: { type: Boolean, default: false },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        satellites: { type: Number, default: 0 }
    },
    { timestamps: true }
);

module.exports = mongoose.model('GasData', gasDataSchema);
