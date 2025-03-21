function validateBody(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const message = error.details?.[0]?.message || 'Validation error';
            console.log(message);
            return res.status(400).json({ message });
        }
        next();
    };
}

module.exports = { validateBody };