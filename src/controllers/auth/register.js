const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User.js');

const { JWT_SECRET = 'default_jwt_secret', EXPIRES_TIME } = process.env;

async function register(req, res, next) {
    try {
        const { email, password, name } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: `Email ${email} is already in use` });
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            passwordHash,
            name: name || '',
        });

        // Generate access/refresh
        const payload = { id: newUser._id };
        const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_TIME });
        const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

        // Save refreshToken to the database
        newUser.refreshToken = refreshToken;
        await newUser.save();

        res.status(201).json({
            name: newUser.name,
            email: newUser.email,
            accessToken,
            // refreshToken,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { register };
