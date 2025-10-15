// src/routes/user.routes.js
const { Router } = require('express');
const { getProfile } = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = Router();

// Esta ruta SÍ está protegida.
// El middleware 'verifyToken' se ejecutará ANTES que la función 'getProfile'.
router.get('/profile', verifyToken, getProfile);

module.exports = router;