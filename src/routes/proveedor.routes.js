// src/routes/proveedor.routes.js
const { Router } = require('express');
const { getProviders } = require('../controllers/proveedor.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = Router();

// Ruta protegida para obtener todos los proveedores
router.get('/', verifyToken, getProviders);

module.exports = router;