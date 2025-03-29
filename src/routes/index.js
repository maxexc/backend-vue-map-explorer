const express = require('express');
const userRouter = require('./user.js');
const pointsRouter = require('./points.js');
const routesRouter = require('./routes.js')

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/points', pointsRouter);
apiRouter.use('/routes', routesRouter);


module.exports = { apiRouter };