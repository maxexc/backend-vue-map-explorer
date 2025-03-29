const { Schema, model } = require('mongoose');

const PointFeatureSchema = new Schema(
    {
        type: { type: String, enum: ['Feature'], required: true },
        geometry: {
            type: {
                type: String,
                enum: ['Point'],
                required: true,
            },
            coordinates: {
                type: [Number], // [lon, lat]
                required: true,
            },
        },
        properties: { type: Object, default: {} },
    },
    { _id: false }
);

const routeSchema = new Schema({
    name: { type: String, required: true },
    routeType: { type: String, enum: ["traffic", "driving", "walking", "cycling"], default: "driving" },
    geometry: {
        type: { type: String, enum: ["Feature"], required: true },
        geometry: {
            type: {
                type: String,
                enum: ["LineString"],
                required: true
            },
            coordinates: {
                type: [[Number]], // [[lon, lat], [lon, lat], ...]
                required: true
            }
        },
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isShared: { type: Boolean, default: false },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    type: { type: String, default: 'Route' },
    feedbacks: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            userName: { type: String, required: true },
            comment: { type: String, required: true },
        }
    ],
    points: {
        type: { type: String, enum: ['FeatureCollection'], required: true },
        features: {
            type: [PointFeatureSchema],
            validate: {
                validator: function (arr) {
                    return arr.length >= 2; // Check at least A and B points
                },
                message: 'Must have at least 2 points (A and B).',
            },
            required: true,
        },
    },
},
    {
        versionKey: false,
        timestamps: true,
    }
);


routeSchema.index({ 'geometry.geometry': '2dsphere' }); // geo-index

module.exports = model('Route', routeSchema);