// src/routes/user.routes.js
const { Router } = require('express');
const { getProfile } = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = Router();

// Ruta protegida para obtener el perfil del usuario autenticado
router.get('/profile', verifyToken, getProfile);

module.exports = router;