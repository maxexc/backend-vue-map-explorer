const jwt = require('jsonwebtoken');
const User = require('../../models/User.js');
const { HttpError } = require('../../utils/HttpError.js');

const { JWT_SECRET = 'default_jwt_secret', EXPIRES_TIME = '1h' } = process.env;

async function refresh(req, res, next) {
    try {
        // Take the refreshToken from the cookie, not from the body!
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        let payload;
        try {
            payload = jwt.verify(refreshToken, JWT_SECRET);
        } catch (err) {
            console.log('[refresh] jwt.verify error:', err);
            throw new HttpError(401, 'Refresh token expired or invalid');
        }

        const user = await User.findById(payload.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!user.refreshToken || user.refreshToken !== refreshToken) {
            throw new HttpError(401, 'Invalid refresh token');
        }

        // Generate a new accessToken (refresh - if require)
        const newAccessToken = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: EXPIRES_TIME,
        });
        res.json({
            accessToken: newAccessToken,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { refresh };
