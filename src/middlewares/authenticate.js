const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const { HttpError } = require('../utils/HttpError.js');

const { JWT_SECRET = 'default_jwt_secret' } = process.env;

async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token) {
            throw new HttpError(401, 'Unauthorized: malformed token');
        }

        let payload;
        try {
            payload = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            console.log(err);
            return res.status(401).json({ message: 'Unauthorized' }); // Unauthorized: token invalid or expired
        }

        const user = await User.findById(payload.id);
        if (!user) {
            throw new HttpError(401, 'Unauthorized: user not found');
        }

        req.user = user; // transmit to all subsequent controllers
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = { authenticate };
