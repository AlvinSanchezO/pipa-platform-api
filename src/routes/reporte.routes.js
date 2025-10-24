// src/routes/reporte.routes.js
const { Router } = require('express');
const { createReport, getStatus } = require('../controllers/reporte.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = Router();

// Route POST for creating a report (requires authentication)
router.post('/', verifyToken, createReport);

// Route GET for checking water status by colonia (public)
// ':nombreColonia' is a dynamic parameter that captures the name from the URL
router.get('/colonia/:nombreColonia', getStatus);

module.exports = router;