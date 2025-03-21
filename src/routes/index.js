const express = require('express');
const userRouter = require('./user.js');
const pointsRouter = require('./points.js');

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/points', pointsRouter);

module.exports = { apiRouter };