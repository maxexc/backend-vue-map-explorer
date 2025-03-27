const express = require('express');
const { getPoints } = require('../controllers/points/getPoints.js');
const { getPointById } = require('../controllers/points/getPointById.js');
const { addPoint } = require('../controllers/points/addPoint.js');
const { updatePoint } = require('../controllers/points/updatePoint.js');
const { deletePoint } = require('../controllers/points/deletePoint.js');
const { authenticate } = require('../middlewares/authenticate.js');
const { validateBody } = require('../middlewares/validateBody.js');
const { createPointSchema, updatePointSchema } = require('../schemas/pointsSchemas.js');

const router = express.Router();

router.get('/', authenticate, getPoints);

router.post('/', authenticate, validateBody(createPointSchema), addPoint);

// Update by id (PUT /points/:id) (owner)
// router.put('/:id', authenticate, validateBody(updatePointSchema), updatePoint);

router.get('/:id', authenticate, getPointById);

// Update - Changed update logic (PUT /points/) (owner id inside the request)
router.put('/', authenticate, validateBody(updatePointSchema), updatePoint);

router.delete('/:id', authenticate, deletePoint);

module.exports = router;
