const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        name: { type: String, default: '' },
        avatarURL: { type: String, default: '' },
        refreshToken: { type: String, default: '' },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false, // don't keep __v
        timestamps: true,  // Mongoose will set createdAt and updatedAt itself
    }
);

module.exports = model('User', userSchema);
