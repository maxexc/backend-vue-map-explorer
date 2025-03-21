const Point = require('../../models/Point.js');
const User = require('../../models/User.js');

async function deleteUser(req, res, next) {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        await Point.deleteMany({ owner: user._id });

        await User.findByIdAndDelete(user._id);
        return res.status(200).json({ message: "User and all associated points deleted" });
    } catch (error) {
        next(error);
    }
}

module.exports = { deleteUser };