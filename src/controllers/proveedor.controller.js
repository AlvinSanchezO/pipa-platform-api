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

/**
 * Controlador para que un proveedor actualice su perfil.
 */
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // ID del usuario (proveedor) desde el token.
    const updateData = req.body; // Datos a actualizar (telefono, zonas_cobertura).

    const allowedUpdates = {};
    if (updateData.telefono !== undefined) allowedUpdates.telefono = updateData.telefono;
    if (updateData.zonas_cobertura !== undefined) allowedUpdates.zonas_cobertura = updateData.zonas_cobertura;

    if (Object.keys(allowedUpdates).length === 0) {
        return res.status(400).json({ message: 'No se proporcionaron datos válidos para actualizar.' });
    }

    const proveedorActualizado = await proveedorService.updateProviderProfile(userId, allowedUpdates);
    res.status(200).json(proveedorActualizado);

  } catch (error) {
    if (error.message.includes('Perfil de proveedor no encontrado')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error al actualizar el perfil del proveedor', error: error.message });
  }
};

// Exporta todas las funciones del controlador
module.exports = {
  getProviders,
  getMyOrders,
  register,
  updateProfile,
};