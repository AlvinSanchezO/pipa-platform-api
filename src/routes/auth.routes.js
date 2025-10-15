// src/routes/auth.routes.js

// Importamos el Router de Express para definir nuestras rutas.
const { Router } = require('express');
// Importamos las funciones 'register' y 'login' de nuestro controlador.
const { register, login } = require('../controllers/auth.controller');

// Creamos una nueva instancia del Router.
const router = Router();

// --- Definición de Rutas de Autenticación ---

// Ruta para el registro de un nuevo usuario.
// Cuando llegue una petición POST a '/register', se ejecutará la función 'register'.
router.post('/register', register);

// Ruta para el inicio de sesión de un usuario.
// Cuando llegue una petición POST a '/login', se ejecutará la función 'login'.
router.post('/login', login);

// Exportamos el router para usarlo en nuestro archivo principal del servidor.
module.exports = router;