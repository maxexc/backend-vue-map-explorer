const Point = require('../../models/Point.js');
const { HttpError } = require('../../utils/HttpError.js');

async function updatePoint(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id, title, description, coordinates, img, rating, feedbacks, isPublic } = req.body;
        if (!id) {
            return res.status(400).json({ message: "No id provided" });
        }

        const point = await Point.findById(id);
        if (!point) {
            return res.status(404).json({ message: "Point not found" });
        }

        if (point.owner.toString() !== req.user._id.toString()) {
            throw new HttpError(403, 'Not the owner');
        }

        // Update only the fields that came in (Joi has already checked them)
        // const { title, description, coordinates, img } = req.body;
        if (isPublic !== undefined) point.isPublic = isPublic;
        if (title !== undefined) point.title = title;
        if (description !== undefined) point.description = description;
        if (coordinates !== undefined) point.coordinates = coordinates;
        if (img !== undefined) point.img = img;

        if (point.isPublic === true) {
            if (rating !== undefined) point.rating = rating;
            if (feedbacks !== undefined) point.feedbacks = feedbacks;
        }

        await point.save();
        res.status(200).json({ message: 'Point successfully updated' });
    } catch (error) {
        next(error);
    }
}

module.exports = { updatePoint };
