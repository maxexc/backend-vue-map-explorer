const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User.js');

const { JWT_SECRET = 'default_jwt_secret', EXPIRES_TIME = '1h' } = process.env;

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Email or password is wrong" });
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Email or password is wrong" });
        }

        const payload = { id: user._id };
        const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_TIME });
        const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

        user.refreshToken = refreshToken;
        await user.save();

        // Put refreshToken in the cookie.
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, // false on dev. On production -> true
            sameSite: 'None', // when dev http, can be 'strict', 
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
        });

        res.json({
            // refreshToken,
            accessToken
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { login };
