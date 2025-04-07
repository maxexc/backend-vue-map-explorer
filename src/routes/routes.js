const express = require('express');
const { addRoute } = require('../controllers/routes/addRoute.js');
const { getRoutes } = require('../controllers/routes/getRoutes.js');
const { deleteRoute } = require('../controllers/routes/deleteRoute.js');

const { authenticate } = require('../middlewares/authenticate.js');
const { validateBody } = require('../middlewares/validateBody.js');
const { createRouteSchema, updateRouteSchema } = require('../schemas/routesSchemas.js');
const { getRouteById } = require('../controllers/routes/getRouteById.js');

const router = express.Router();

router.get('/', authenticate, getRoutes);

router.post('/', authenticate, validateBody(createRouteSchema), addRoute);

// TO DO
// router.put('/:id', authenticate, validateBody(updateRouteSchema), updateRoute);

router.get('/:id', authenticate, getRouteById);

router.delete('/:id', authenticate, deleteRoute);

module.exports = router;
