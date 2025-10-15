// src/services/reporte.service.js

const { Reporte } = require('../models/index');

/**
 * Servicio para crear un nuevo reporte en la base de datos.
 * @param {object} reportData - Datos del reporte (estado, colonia, userId).
 * @returns {Promise<object>} - El objeto del reporte creado.
 */
const createReport = async (reportData) => {
  const { estado, colonia, userId } = reportData;

  // Creamos el nuevo reporte usando el modelo de Sequelize.
  const nuevoReporte = await Reporte.create({
    estado,
    colonia,
    usuario_id: userId, // Nos aseguramos de asociar el reporte con el usuario.
  });

  return nuevoReporte;
};

module.exports = {
  createReport,
};