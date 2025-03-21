const { Schema, model } = require('mongoose');

const pointSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, default: '' },
        img: { type: String, default: '' },
        coordinates: {
            type: [Number],
            required: [true, 'Set coordinates'],
            validate: {
                validator: function (arr) {
                    return arr.length === 2;
                },
                message:
                    'Coordinates must contain exactly 2 numbers (latitude and longitude)',
            },
        },
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        isPublic: { type: Boolean, default: false }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model('Point', pointSchema);
