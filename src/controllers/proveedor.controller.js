// src/controllers/proveedor.controller.js
const proveedorService = require('../services/proveedor.service');

/**
 * Controlador para obtener la lista de todos los proveedores.
 */
const getProviders = async (req, res) => {
  try {
    const proveedores = await proveedorService.getAllProviders();
    res.status(200).json(proveedores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los proveedores', error: error.message });
  }
};

module.exports = {
  getProviders,
};