const Route = require('../../models/Route.js');

async function getRoutes(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const ownerId = req.user._id;
        const routes = await Route.find({ owner: ownerId });

        res.status(200).json(routes);
    } catch (error) {
        next(error);
    }
}

module.exports = { getRoutes };
