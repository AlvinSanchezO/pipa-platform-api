// src/routes/auth.routes.js

// Importamos el Router de Express para definir nuestras rutas.
const { Router } = require('express');
// Importamos la función 'register' que crearemos en nuestro controlador.
const { register } = require('../controllers/auth.controller');

// Creamos una nueva instancia del Router.
const router = Router();

// Definimos la ruta para el registro.
// Cuando llegue una petición POST a '/register', se ejecutará la función 'register'.
router.post('/register', register);

// Exportamos el router para usarlo en nuestro archivo principal.
module.exports = router;