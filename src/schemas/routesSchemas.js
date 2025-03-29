const Joi = require('joi');

const createRouteSchema = Joi.object({
    name: Joi.string().min(1).max(300).required(),
    routeType: Joi.string().valid('traffic', 'driving', 'walking', 'cycling').default('driving'),
    isShared: Joi.boolean().default(false),
    rating: Joi.number().min(0).max(5).default(0),

    geometry: Joi.object({
        type: Joi.string().valid('Feature').required(),
        geometry: Joi.object({
            type: Joi.string().valid('LineString').required(),
            coordinates: Joi.array().items(
                Joi.array().length(2).items(Joi.number().min(-180).max(180))
            ).min(2).required(),
        }).required(),
        properties: Joi.object().optional(),
    }).required(),

    points: Joi.object({
        type: Joi.string().valid('FeatureCollection').required(),
        features: Joi.array().min(2).items(
            Joi.object({
                type: Joi.string().valid('Feature').required(),
                geometry: Joi.object({
                    type: Joi.string().valid('Point').required(),
                    coordinates: Joi.array()
                        .length(2)
                        .items(Joi.number().min(-180).max(180))
                        .required()
                }).required(),
                properties: Joi.object({
                    name: Joi.string().min(1).max(200).default('Unnamed'),
                    icon: Joi.string().default('default'),
                    rating: Joi.number().min(0).max(5).default(0),
                    private: Joi.boolean().default(false),
                    reviews: Joi.array().default([])
                }).default({})
            })
        ).required()
    }).required(),
    feedbacks: Joi.array()
        .items(Joi.object({
            user: Joi.string().required(),
            userName: Joi.string().required(),
            comment: Joi.string().required()
        }))
        .optional(),
});



const updateRouteSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().min(1).max(200).optional(),
    routeType: Joi.string().valid('traffic', 'driving', 'walking', 'cycling').optional(),
    isShared: Joi.boolean().optional(),
    rating: Joi.number().min(0).max(5).optional(),
    geometry: Joi.object({
        type: Joi.string().valid('Feature').optional(),
        geometry: Joi.object({
            type: Joi.string().valid('LineString').optional(),
            coordinates: Joi.array().items(
                Joi.array().length(2).items(Joi.number().min(-180).max(180))
            ).optional()
        }).optional()
    }).optional(),

    points: Joi.object({
        type: Joi.string().valid('FeatureCollection').optional(),
        features: Joi.array().items(
            Joi.object({
                type: Joi.string().valid('Feature').optional(),
                geometry: Joi.object({
                    type: Joi.string().valid('Point').optional(),
                    coordinates: Joi.array()
                        .length(2)
                        .items(Joi.number().min(-180).max(180))
                        .optional()
                }).optional(),
                properties: Joi.object({
                    name: Joi.string().min(1).max(200).optional(),
                    icon: Joi.string().optional(),
                    rating: Joi.number().min(0).max(5).optional(),
                    private: Joi.boolean().optional(),
                    reviews: Joi.array().optional()
                }).optional()
            })
        ).optional()
    }).optional(),
    feedbacks: Joi.array()
        .items(Joi.object({
            user: Joi.string().required(),
            userName: Joi.string().required(),
            comment: Joi.string().required()
        }))
        .optional(),
});

module.exports = {
    createRouteSchema,
    updateRouteSchema,
};
