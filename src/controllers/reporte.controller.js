// src/controllers/reporte.controller.js
const reporteService = require('../services/reporte.service');

/**
 * Controlador para crear un nuevo reporte de estado del agua.
 */
const createReport = async (req, res) => {
  try {
    const userId = req.user.id;
    const { estado, colonia } = req.body;
    const nuevoReporte = await reporteService.createReport({ estado, colonia, userId });
    res.status(201).json(nuevoReporte);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el reporte', error: error.message });
  }
};

/**
 * Controlador para obtener el estado del agua por colonia.
 */
const getStatus = async (req, res) => {
  try {
    // Get the colonia name from the URL parameter
    const { nombreColonia } = req.params;

    if (!nombreColonia) {
      return res.status(400).json({ message: 'El nombre de la colonia es requerido.' });
    }

    // Call the service to get the consolidated status
    const estadoColonia = await reporteService.getStatusByColonia(nombreColonia);
    res.status(200).json(estadoColonia);

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el estado de la colonia', error: error.message });
  }
};

// Export both controller functions
module.exports = {
  createReport,
  getStatus,
};