// src/routes/reporte.routes.js
const { Router } = require('express');
const { verifyToken } = require('../middleware/auth.middleware');
const { createReport } = require('../controllers/reporte.controller'); // 👈 Importamos la función

const router = Router();

// La petición POST a la raíz ('/') ahora es manejada por 'createReport'.
// El middleware 'verifyToken' se ejecuta primero para asegurar que el usuario esté autenticado.
router.post('/', verifyToken, createReport);

module.exports = router;