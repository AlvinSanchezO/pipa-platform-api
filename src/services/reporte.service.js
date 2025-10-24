// src/services/reporte.service.js
const { Reporte, Usuario } = require('../models/index');
const { Op } = require('sequelize');

/**
 * Servicio para crear un nuevo reporte en la base de datos.
 */
const createReport = async (reportData) => {
  const { estado, colonia, userId } = reportData;
  const nuevoReporte = await Reporte.create({
    estado,
    colonia,
    usuario_id: userId,
  });
  return nuevoReporte;
};

/**
 * Servicio para obtener el estado consolidado del agua en una colonia,
 * basado en reportes recientes.
 */
const getStatusByColonia = async (nombreColonia) => {
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

  const recentReports = await Reporte.findAll({
    where: {
      colonia: nombreColonia,
      // 👇 USA EL NOMBRE CORRECTO DE LA COLUMNA DE FECHA
      createdAt: {
        [Op.gte]: thirtyMinutesAgo,
      }
    },
    attributes: ['estado'],
  });

  if (recentReports.length === 0) {
    return {
      estado: 'sin_datos_recientes',
      mensaje: 'No hay reportes recientes para esta colonia en los últimos 30 minutos.',
      totalReportes: 0,
    };
  }

  let conAgua = 0;
  let sinAgua = 0;
  recentReports.forEach(reporte => {
    if (reporte.estado === 'con_agua') {
      conAgua++;
    } else {
      sinAgua++;
    }
  });

  const total = recentReports.length;
  const percentageWithWater = (conAgua / total) * 100;

  let consolidatedStatus = 'mixto';
  let message = `Reportes recientes (${total}): ${conAgua} con agua, ${sinAgua} sin agua.`;

  if (percentageWithWater >= 80) {
    consolidatedStatus = 'con_agua';
    message = `La mayoría (${percentageWithWater.toFixed(0)}%) reporta tener agua.`;
  } else if (percentageWithWater <= 20) {
    consolidatedStatus = 'sin_agua';
    message = `La mayoría (${(100 - percentageWithWater).toFixed(0)}%) reporta no tener agua.`;
  }

  return {
    colonia: nombreColonia,
    estado: consolidatedStatus,
    mensaje: message,
    totalReportes: total,
    reportesDetalle: { conAgua, sinAgua }
  };
};

module.exports = {
  createReport,
  getStatusByColonia,
};