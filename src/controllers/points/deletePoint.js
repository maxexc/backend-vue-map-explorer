const Point = require('../../models/Point.js');
const { HttpError } = require('../../utils/HttpError.js');

async function deletePoint(req, res, next) {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id } = req.params;
        const point = await Point.findById(id);
        if (!point) {
            throw new HttpError(404, 'Point not found');
        }
        if (point.owner.toString() !== user._id.toString()) {
            throw new HttpError(403, 'You cannot delete this point');
        }

        await Point.findByIdAndDelete(id);
        res.json({ message: 'Point deleted successfully' });
    } catch (error) {
        next(error);
    }
}

module.exports = { deletePoint };
