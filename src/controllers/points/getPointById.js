const Point = require('../../models/Point.js');

const getPointById = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { id } = req.params;

        const point = await Point.findById(id);
        if (!point) {
            return res.status(404).json({ message: 'Point not found' });
        }

        res.status(200).json(point);
    } catch (error) {
        console.error('Error fetching point by id:', error);
        res.status(500).json({ message: `Server error: ${error}` });
    }
};

module.exports = { getPointById };
