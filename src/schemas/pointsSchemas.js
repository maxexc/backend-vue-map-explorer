const Joi = require('joi');

const base64Pattern = /^data:image\/[a-zA-Z0-9+\-.]+;base64,/;

// ~75KB => 75000 bytes, Base64 a bit more (multiplies ~1.34).
// limit to 100000 characters for reliability.  Joi.max(100000)

const createPointSchema = Joi.object({
    title: Joi.string().min(1).max(350).required()
        .messages({
            'string.max': 'Title cannot exceed 350 characters'
        }),
    description: Joi.string().max(1500).allow('')
        .messages({
            'string.max': 'Description cannot exceed 1500 characters'
        }),
    img: Joi
        .string()
        .pattern(base64Pattern)
        .max(100000)   // do not allow >100KB
        .messages({
            'string.pattern.base': 'img must be a valid base64 data URL',
            'string.max': 'Image too large (> ~75KB)',
        })
        .allow('')     // empty line if no picture
        .optional(),
    coordinates: Joi.array()
        .items(Joi.number().min(-180).max(180))
        .length(2)
        .required(),
});

const updatePointSchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().min(1).max(200).optional(),
    description: Joi.string().max(1000).allow('').optional(),
    img: Joi
        .string()
        .pattern(base64Pattern)
        .max(100000)
        .messages({
            'string.pattern.base': 'img must be a valid base64 data URL',
            'string.max': 'Image too large (> ~75KB)',
        })
        .allow('')
        .optional(),
    coordinates: Joi.array()
        .items(Joi.number().min(-180).max(180))
        .length(2)
        .optional(),
    rating: Joi.number().min(0).max(5).optional(),
    feedbacks: Joi.array()
        .items(Joi.object({
            user: Joi.string().required(),
            userName: Joi.string().required(),
            comment: Joi.string().required()
        }))
        .optional(),
});

module.exports = {
    createPointSchema,
    updatePointSchema,
};