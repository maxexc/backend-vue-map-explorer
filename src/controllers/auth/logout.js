const User = require('../../models/User.js');

async function logout(req, res, next) {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Reset refreshToken
        // await User.findByIdAndUpdate(user._id, { refreshToken: '' });

        const { refreshToken } = req.cookies;
        if (refreshToken) {
            const user = await User.findOne({ refreshToken });
            if (user) {
                user.refreshToken = '';
                await user.save();
            }
        }
        // delete the cookie
        res.clearCookie('refreshToken');

        res.json({ message: "User successfully logout" });
    } catch (error) {
        next(error);
    }
}

module.exports = { logout };
