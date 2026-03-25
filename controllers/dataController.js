const GasData = require('../models/GasData');

// POST /api/data
exports.createData = async (req, res) => {
    try {
        const {
            device_id,
            gas,
            gas_digital,
            voltage,
            percent,
            status,
            alarm,
            gps_valid,
            lat,
            lng,
            satellites
        } = req.body;

        // --- Validation ---
        if (!device_id) {
            return res.status(400).json({ success: false, error: 'device_id is required' });
        }
        if (gas === undefined || typeof gas !== 'number') {
            return res.status(400).json({ success: false, error: 'gas must be a number' });
        }
        if (lat === undefined || typeof lat !== 'number') {
            return res.status(400).json({ success: false, error: 'lat must be a number' });
        }
        if (lng === undefined || typeof lng !== 'number') {
            return res.status(400).json({ success: false, error: 'lng must be a number' });
        }
        if (status && !['normal', 'warning', 'danger'].includes(status)) {
            return res.status(400).json({ success: false, error: 'status must be one of: normal, warning, danger' });
        }
        if (gas_digital !== undefined && ![0, 1].includes(gas_digital)) {
            return res.status(400).json({ success: false, error: 'gas_digital must be 0 or 1' });
        }

        const record = new GasData({
            device_id,
            gas,
            gas_digital,
            voltage,
            percent,
            status,
            alarm,
            gps_valid,
            lat,
            lng,
            satellites
        });

        const saved = await record.save();

        return res.status(201).json({
            success: true,
            message: 'Data saved successfully',
            data: saved
        });
    } catch (err) {
        console.error('createData error:', err);
        return res.status(500).json({ success: false, error: 'Server error while saving data' });
    }
};

// GET /api/data  →  last 50 records
exports.getLast50 = async (req, res) => {
    try {
        const data = await GasData.find().sort({ createdAt: -1 }).limit(50);
        return res.status(200).json({ success: true, count: data.length, data });
    } catch (err) {
        console.error('getLast50 error:', err);
        return res.status(500).json({ success: false, error: 'Server error fetching records' });
    }
};

// GET /api/latest  →  single most recent record
exports.getLatest = async (req, res) => {
    try {
        const record = await GasData.findOne().sort({ createdAt: -1 });
        if (!record) {
            return res.status(404).json({ success: false, error: 'No records found' });
        }
        return res.status(200).json({ success: true, data: record });
    } catch (err) {
        console.error('getLatest error:', err);
        return res.status(500).json({ success: false, error: 'Server error fetching latest record' });
    }
};

// GET /api/data/:device_id  →  history for one device
exports.getDeviceHistory = async (req, res) => {
    try {
        const { device_id } = req.params;
        const data = await GasData.find({ device_id }).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, count: data.length, data });
    } catch (err) {
        console.error('getDeviceHistory error:', err);
        return res.status(500).json({ success: false, error: 'Server error fetching device history' });
    }
};
