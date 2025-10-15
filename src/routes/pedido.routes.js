// src/routes/pedido.routes.js

// Importamos los módulos necesarios de nuestras otras capas.
const { Router } = require('express');
const { createOrder, getOrders } = require('../controllers/pedido.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Creamos una nueva instancia del Router.
const router = Router();

// --- Definición de Rutas de Pedidos ---

// Ruta para crear un nuevo pedido.
// Método: POST a la raíz ('/')
// Está protegida: un usuario debe estar logueado para crear un pedido.
router.post('/', verifyToken, createOrder);

// Ruta para obtener el historial de pedidos del usuario logueado.
// Método: GET a la raíz ('/')
// Está protegida: un usuario solo puede ver sus propios pedidos.
router.get('/', verifyToken, getOrders);

// Exportamos el router para que sea usado en el archivo principal (index.js).
module.exports = router;