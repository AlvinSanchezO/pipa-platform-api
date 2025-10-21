// src/routes/proveedor.routes.js
const { Router } = require('express');
const { getProviders, getMyOrders } = require('../controllers/proveedor.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = Router();

// Ruta GET para obtener todos los proveedores.
router.get('/', verifyToken, getProviders);

// Ruta GET para que un proveedor vea sus pedidos asignados.
router.get('/mis-pedidos', verifyToken, getMyOrders);

module.exports = router;