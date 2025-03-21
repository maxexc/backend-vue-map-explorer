// models/TestItem.js
const { Schema, model } = require('mongoose');

const testItemSchema = new Schema({
    title: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const userName = "Maks"
function sayYes(userName) {
    return `This Backend is from "${userName}"`
}

// Название коллекции в базе будет "testitems" (по умолчанию mongoose берёт нижний регистр + s)
module.exports = model('TestItem', testItemSchema);

module.exports = { userName, sayYes };