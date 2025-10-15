// src/routes/proveedor.routes.js
const { Router } = require('express');
const { getProviders } = require('../controllers/proveedor.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = Router();

// Definimos la ruta GET para obtener todos los proveedores.
// La protegemos con nuestro middleware 'verifyToken'.
router.get('/', verifyToken, getProviders);

module.exports = router;