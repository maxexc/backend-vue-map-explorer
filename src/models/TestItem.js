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

const TestItem = model('TestItem', testItemSchema);
// module.exports = model('TestItem', testItemSchema);

module.exports = { TestItem, userName, sayYes, };