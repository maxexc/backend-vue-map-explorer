const Route = require('../../models/Route.js');
const { HttpError } = require('../../utils/HttpError.js');

async function deleteRoute(req, res, next) {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id } = req.params;
        const route = await Route.findById(id);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }
        if (route.owner.toString() !== user._id.toString()) {
            throw new HttpError(403, 'You cannot delete this route. Non-owner');
        }

        await Route.findByIdAndDelete(id);
        res.status(200).json({ message: 'Route deleted successfully' });
    } catch (error) {
        next(error);
    }
}

module.exports = { deleteRoute };
