// src/routes/pedido.routes.js
const { Router } = require('express');
const { createOrder } = require('../controllers/pedido.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = Router();

// Definimos la ruta POST para crear un nuevo pedido.
// La protegemos con nuestro middleware 'verifyToken'.
router.post('/', verifyToken, createOrder);

module.exports = router;