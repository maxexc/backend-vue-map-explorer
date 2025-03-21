function errorHandler(err, req, res) {
    console.error('ERROR HANDLER:', err);
    const status = err.status || 500;
    const message = err.message || 'Server error';
    res.status(status).json({ message });
}

module.exports = { errorHandler };
