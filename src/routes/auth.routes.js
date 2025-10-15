// src/routes/auth.routes.js
const { Router } = require('express');
const { register, login } = require('../controllers/auth.controller');

const router = Router();

// Ruta para el registro de un nuevo usuario
router.post('/register', register);

// Ruta para el inicio de sesión de un usuario
router.post('/login', login);

module.exports = router;