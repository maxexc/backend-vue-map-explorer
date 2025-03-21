require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const { errorHandler } = require('./middlewares/errorHandler.js');
const { apiRouter } = require('./routes/index.js');


const PORT = process.env.PORT || 3001;
const DB_URI = process.env.MONGODB_URI;

const app = express();

app.use(morgan('dev'))

// Middlewares Configuring CORS so that the front can send cookies
app.use(cors({
  origin: true,              // Allow any source (or specific one)
  credentials: true          // for cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>VueMap-Explorer</title>
        <link rel="shortcut icon" href="#"/>   
      </head>
      <body style="font-family: sans-serif; text-align: center;">
        <h1 style="color: #3aa">Welcome to the VueMap-Explorer backend!</h1>
        <p>All API requests start with <code>/</code>.</p>
      </body>
    </html>
  `);
});

// Test Routing
app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint' });
});

app.use('/', apiRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);

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

