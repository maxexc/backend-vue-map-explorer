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





// // models/User.js
// const { Schema, model } = require('mongoose');

// // Простейшая схема
// const userSchema = new Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     age: { type: Number, default: 0 },
//     hobbies: { type: [String], default: [] },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
//     // можно добавить поля по желанию
// }, {
//     versionKey: false // <-- отключаем __v
//     // вторая опция: timestamps: true (если хотим, чтобы Mongoose сам добавлял createdAt/updatedAt)
//     // timestamps: true
// });

// // "User" => в базе будет коллекция "users"
// module.exports = model('User', userSchema);

// // Важно: Mongoose автоматически возьмёт имя User, сделает в нижнем регистре + s, то есть «users» — совпадёт с тем, что у вас есть.

