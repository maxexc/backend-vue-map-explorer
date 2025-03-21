const Point = require('../../models/Point.js');
// const { getAllPoints } = require('../../services/pointsService.js');

async function getPoints(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const ownerId = req.user._id;
        const points = await Point.find({ owner: ownerId });

        res.status(200).json(points);
    } catch (error) {
        next(error);
    }
}

module.exports = { getPoints };
