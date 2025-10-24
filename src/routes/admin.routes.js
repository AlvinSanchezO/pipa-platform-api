// src/routes/admin.routes.js
const { Router } = require('express');
const { approveProvider } = require('../controllers/admin.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { isAdmin } = require('../middleware/admin.middleware'); // 👈 Importa el middleware de admin

const router = Router();

// --- Definición de Rutas de Administrador ---

// Ruta PATCH para aprobar un proveedor
// Se aplican AMBOS middlewares: primero verifica el token, LUEGO verifica el rol de admin.
// ':providerId' es un parámetro que capturará el ID del proveedor desde la URL.
router.patch('/proveedores/:providerId/approve', verifyToken, isAdmin, approveProvider);

// Aquí podrías añadir más rutas de admin en el futuro (ej. rechazar, suspender, etc.)

module.exports = router;