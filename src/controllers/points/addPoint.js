const Point = require('../../models/Point.js');
const { HttpError } = require('../../utils/HttpError.js');

async function addPoint(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { title, description = '', coordinates, img = '' } = req.body;
        if (!title || coordinates.length !== 2) {
            console.log('coordinates.length:', coordinates.length);

            throw new HttpError(400, 'title, coordinates are required');
        }

        // Optional (Joi already has it) check for img size < 75KB
        if (img) {
            const splitted = img.split(',');
            if (splitted.length === 2) {
                const b64Data = splitted[1];
                const buff = Buffer.from(b64Data, 'base64');
                if (buff.length > 75_000) {
                    throw new HttpError(400, 'Image bigger than 75KB');
                }
            }
        }

        await Point.create({
            title,
            description,
            img,
            coordinates,
            owner: req.user._id,
        });
        res.status(200).json({ points: 'Point added' });
    } catch (error) {
        next(error);
    }
}

module.exports = { addPoint };
