// src/services/proveedor.service.js
const { Proveedor, Pedido, Usuario } = require('../models/index');

/**
 * Servicio para obtener todos los proveedores.
 * @returns {Promise<Array>} - Un arreglo con todos los proveedores.
 */
const getAllProviders = async () => {
  const proveedores = await Proveedor.findAll({
    attributes: { exclude: ['fecha_creacion', 'fecha_actualizacion'] }
  });
  return proveedores;
};

/**
 * Servicio para obtener los pedidos de un proveedor específico.
 * @param {number} proveedorId - El ID del proveedor.
 * @returns {Promise<Array>} - Un arreglo con los pedidos del proveedor.
 */
const getOrdersByProviderId = async (proveedorId) => {
  const pedidos = await Pedido.findAll({
    where: { proveedor_id: proveedorId },
    // Incluimos la info del usuario que hizo el pedido para que sea útil.
    include: [{
      model: Usuario,
      attributes: ['nombre', 'email', 'colonia']
    }]
  });
  return pedidos;
};

module.exports = {
  getAllProviders,
  getOrdersByProviderId,
};