const Route = require('../../models/Route.js');

const getRouteById = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { id } = req.params;

        const route = await Route.findById(id);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }
        if (route.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied. Non-owner' });
        }

        res.status(200).json(route);
    } catch (error) {
        console.error('Error fetching point by id:', error);
        res.status(500).json({ message: `Server error: ${error.message}` })
    }
}

module.exports = { getRouteById }