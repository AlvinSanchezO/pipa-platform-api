// src/routes/pedido.routes.js

// Importamos los módulos necesarios de nuestras otras capas.
const { Router } = require('express');
const { createOrder, getOrders, rateOrder } = require('../controllers/pedido.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Creamos una nueva instancia del Router.
const router = Router();

// --- Definición de Rutas de Pedidos ---

// Ruta para crear un nuevo pedido.
// Método: POST a la raíz ('/')
router.post('/', verifyToken, createOrder);

// Ruta para obtener el historial de pedidos del usuario logueado.
// Método: GET a la raíz ('/')
router.get('/', verifyToken, getOrders);

// Ruta para calificar un pedido específico.
// Método: PATCH a '/:pedidoId/rate'
// ':pedidoId' es un parámetro dinámico que contendrá el ID del pedido a calificar.
router.patch('/:pedidoId/rate', verifyToken, rateOrder);

// Exportamos el router para que sea usado en el archivo principal (index.js).
module.exports = router;