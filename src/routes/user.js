const express = require('express');
const { register } = require('../controllers/auth/register.js');
const { login } = require('../controllers/auth/login.js');
const { logout } = require('../controllers/auth/logout.js');
const { refresh } = require('../controllers/auth/refresh.js');
const { me } = require('../controllers/auth/me.js');
const { authenticate } = require('../middlewares/authenticate.js');
const { deleteUser } = require('../controllers/auth/delete.js');

const { validateBody } = require('../middlewares/validateBody.js');
const { registerSchema, loginSchema } = require('../schemas/usersSchema.js');

const router = express.Router();

// Public
router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/refresh', refresh);

// Private (token required)
router.get('/logout', authenticate, logout);
router.get('/me', authenticate, me);

// Delete by id (owner) additional option - will be closed for general
router.delete('/:id', authenticate, deleteUser);

module.exports = router;
