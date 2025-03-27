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
            return res.status(404).json({ message: 'Point not found' });
        }
        if (point.owner.toString() !== user._id.toString()) {
            throw new HttpError(403, 'You cannot delete this point. Non-owner');
        }

        await Point.findByIdAndDelete(id);
        res.status(200).json({ message: 'Point deleted successfully' });
    } catch (error) {
        next(error);
    }
}

module.exports = { deletePoint };
