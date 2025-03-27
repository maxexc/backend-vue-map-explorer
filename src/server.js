const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3001;
const DB_URI = process.env.MONGODB_URI;

mongoose
    .connect(DB_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

