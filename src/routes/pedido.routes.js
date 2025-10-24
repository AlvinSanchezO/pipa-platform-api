// src/routes/pedido.routes.js
const { Router } = require('express');
// 👇 Actualiza la importación
const { createOrder, getOrders, rateOrder, updateOrderStatus } = require('../controllers/pedido.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = Router();

// ... (rutas POST para crear, GET para historial, PATCH para calificar se quedan igual) ...
router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, getOrders);
router.patch('/:pedidoId/rate', verifyToken, rateOrder);

// 👇 Añade la ruta para actualizar el estado
router.patch('/:pedidoId/status', verifyToken, updateOrderStatus);

module.exports = router;