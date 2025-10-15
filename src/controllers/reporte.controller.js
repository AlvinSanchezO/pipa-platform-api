// src/controllers/reporte.controller.js

const reporteService = require('../services/reporte.service');

/**
 * Controlador para crear un nuevo reporte de estado del agua.
 */
const createReport = async (req, res) => {
  try {
    // 1. El ID del usuario lo obtenemos del token JWT (verificado por el middleware).
    const userId = req.user.id;
    // 2. Los datos del reporte los obtenemos del cuerpo de la petición.
    const { estado, colonia } = req.body;

    // 3. Pasamos los datos al servicio para que cree el reporte.
    const nuevoReporte = await reporteService.createReport({ estado, colonia, userId });

    // 4. Si todo sale bien, respondemos con el reporte creado.
    res.status(201).json(nuevoReporte);

  } catch (error) {
    // 5. Manejamos posibles errores.
    res.status(500).json({ message: 'Error al crear el reporte', error: error.message });
  }
};

module.exports = {
  createReport,
};