const Point = require('../../models/Point.js');
const { HttpError } = require('../../utils/HttpError.js');

async function updatePoint(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id, title, description, coordinates, img } = req.body;
        if (!id) {
            throw new HttpError(400, 'No id provided');
        }

        const point = await Point.findById(id);
        if (!point) {
            throw new HttpError(404, 'Point not found');
        }

        if (point.owner.toString() !== req.user._id.toString()) {
            throw new HttpError(403, 'Not the owner');
        }

        // Update only the fields that came in (Joi has already checked them)
        // const { title, description, coordinates, img } = req.body;
        if (title !== undefined) point.title = title;
        if (description !== undefined) point.description = description;
        if (coordinates !== undefined) point.coordinates = coordinates;
        if (img !== undefined) point.img = img;

        await point.save();
        res.status(200).json({ message: 'success' });
    } catch (error) {
        next(error);
    }
}

module.exports = { updatePoint };
