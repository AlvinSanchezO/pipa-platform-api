// src/routes/reporte.routes.js
const { Router } = require('express');
const { createReport } = require('../controllers/reporte.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = Router();

// Ruta protegida para que un usuario cree un nuevo reporte
router.post('/', verifyToken, createReport);

module.exports = router;