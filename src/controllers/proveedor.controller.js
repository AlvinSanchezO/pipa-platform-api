// src/controllers/proveedor.controller.js
const proveedorService = require('../services/proveedor.service');
const { Proveedor } = require('../models/index');

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

/**
 * Controlador para obtener los pedidos del proveedor autenticado.
 */
const getMyOrders = async (req, res) => {
  try {
    // 1. Obtenemos el ID del usuario desde el token.
    const userId = req.user.id;

    // 2. Buscamos el perfil de proveedor asociado a este usuario.
    const proveedor = await Proveedor.findOne({ where: { usuario_id: userId } });
    if (!proveedor) {
      return res.status(403).json({ message: 'Acceso denegado. No es una cuenta de proveedor.' });
    }

    // 3. Usamos el ID del proveedor para buscar sus pedidos.
    const pedidos = await proveedorService.getOrdersByProviderId(proveedor.id);
    res.status(200).json(pedidos);

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos del proveedor', error: error.message });
  }
};

module.exports = {
  getProviders,
  getMyOrders,
};