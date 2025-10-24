// src/routes/proveedor.routes.js
const { Router } = require('express');
const { getProviders, getMyOrders, register, updateProfile } = require('../controllers/proveedor.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = Router();

// Ruta GET para obtener todos los proveedores.
router.get('/', verifyToken, getProviders);

// Ruta GET para que un proveedor vea sus pedidos asignados.
router.get('/mis-pedidos', verifyToken, getMyOrders);

// Ruta POST para que un usuario se registre como proveedor
router.post('/register', verifyToken, register);

// Ruta PATCH para que un proveedor actualice su propio perfil
router.patch('/mi-perfil', verifyToken, updateProfile);

module.exports = router;