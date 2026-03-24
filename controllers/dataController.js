const Data = require('../models/Data');

exports.createData = async (req, res) => {
    try {
        const { device_id, gas, status, lat, lng, battery, alarm } = req.body;

        // Validation
        if (!device_id) {
            return res.status(400).json({ success: false, error: 'device_id is required' });
        }
        if (gas === undefined || typeof gas !== 'number') {
            return res.status(400).json({ success: false, error: 'gas must be a number' });
        }
        if (lat !== undefined && typeof lat !== 'number') {
            return res.status(400).json({ success: false, error: 'lat must be a number' });
        }
        if (lng !== undefined && typeof lng !== 'number') {
            return res.status(400).json({ success: false, error: 'lng must be a number' });
        }

        const newData = new Data({
            device_id,
            gas,
            status,
            lat,
            lng,
            battery,
            alarm
        });

        await newData.save();
        return res.status(201).json({ success: true, data: newData });

    } catch (error) {
        console.error('Error creating data:', error);
        return res.status(500).json({ success: false, error: 'Server error while saving data' });
    }
};

exports.getLast50Records = async (req, res) => {
    try {
        const data = await Data.find().sort({ createdAt: -1 }).limit(50);
        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error fetching records:', error);
        return res.status(500).json({ success: false, error: 'Server error fetching records' });
    }
};

exports.getDeviceHistory = async (req, res) => {
    try {
        const { device_id } = req.params;
        const data = await Data.find({ device_id }).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error fetching device history:', error);
        return res.status(500).json({ success: false, error: 'Server error fetching device history' });
    }
};

exports.getLatestRecord = async (req, res) => {
    try {
        const data = await Data.findOne().sort({ createdAt: -1 });
        if (!data) {
            return res.status(404).json({ success: false, error: 'No records found' });
        }
        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error fetching latest record:', error);
        return res.status(500).json({ success: false, error: 'Server error fetching latest record' });
    }
};
