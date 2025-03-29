const express = require('express');
const router = express.Router();

const { addRoute } = require('../controllers/routes/addRoute.js');
const { authenticate } = require('../middlewares/authenticate.js');
const { validateBody } = require('../middlewares/validateBody.js');
const { createRouteSchema, updateRouteSchema } = require('../schemas/routesSchemas.js');

router.post('/', authenticate, validateBody(createRouteSchema), addRoute);

// TO DO
// router.put('/', authenticate, validateBody(updateRouteSchema), updateRoute);

module.exports = router;
