const Route = require('../../models/Route.js');

async function addRoute(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { name, routeType, geometry, points } = req.body;

        const newRoute = await Route.create({
            name,
            routeType,
            geometry,
            points,
            owner: req.user._id,
        });

        return res.status(201).json(newRoute);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { addRoute };