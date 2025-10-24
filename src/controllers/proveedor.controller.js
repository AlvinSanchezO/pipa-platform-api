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
    const userId = req.user.id;
    const proveedor = await Proveedor.findOne({ where: { usuario_id: userId } });
    if (!proveedor) {
      return res.status(403).json({ message: 'Acceso denegado. No es una cuenta de proveedor.' });
    }
    const pedidos = await proveedorService.getOrdersByProviderId(proveedor.id);
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos del proveedor', error: error.message });
  }
};

/**
 * Controlador para registrar un nuevo proveedor.
 */
const register = async (req, res) => {
  try {
    const userId = req.user.id; // ID del usuario desde el token.
    const providerData = req.body; // Datos del negocio desde el body.

    // Validación básica
    if (!providerData.nombre_negocio) {
      return res.status(400).json({ message: 'El nombre del negocio es requerido.' });
    }

    const nuevoProveedor = await proveedorService.registerProvider(providerData, userId);
    res.status(201).json(nuevoProveedor);

  } catch (error) {
    if (error.message.includes('ya está registrado')) {
      return res.status(409).json({ message: error.message }); // 409 Conflict
    }
    res.status(500).json({ message: 'Error al registrar el proveedor', error: error.message });
  }
};

// Exporta todas las funciones del controlador
module.exports = {
  getProviders,
  getMyOrders,
  register,
};