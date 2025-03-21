function me(req, res, next) {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
            avatarURL: user.avatarURL,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { me };
