// src/routes/pedido.routes.js
const { Router } = require('express');
const { createOrder, getOrders, rateOrder } = require('../controllers/pedido.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = Router();

// Rutas para la gestión de pedidos
router.post('/', verifyToken, createOrder);       // Crear un pedido
router.get('/', verifyToken, getOrders);         // Ver mi historial de pedidos
router.patch('/:pedidoId/rate', verifyToken, rateOrder); // Calificar un pedido

module.exports = router;