// src/services/proveedor.service.js
const { Proveedor } = require('../models/index');

/**
 * Servicio para obtener todos los proveedores.
 * @returns {Promise<Array>} - Un arreglo con todos los proveedores.
 */
const getAllProviders = async () => {
  // Usamos el método findAll() de Sequelize para obtener todos los registros.
  const proveedores = await Proveedor.findAll({
    // Opcional: Excluimos los campos de fecha para una respuesta más limpia.
    attributes: { exclude: ['fecha_creacion', 'fecha_actualizacion'] }
  });
  return proveedores;
};

module.exports = {
  getAllProviders,
};