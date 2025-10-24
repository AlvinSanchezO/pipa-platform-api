// src/services/proveedor.service.js
const { Proveedor, Pedido, Usuario } = require('../models/index'); // Make sure Usuario is imported

/**
 * Servicio para obtener todos los proveedores.
 */
const getAllProviders = async () => {
  const proveedores = await Proveedor.findAll({
    attributes: { exclude: ['fecha_creacion', 'fecha_actualizacion'] }
  });
  return proveedores;
};

/**
 * Servicio para obtener los pedidos de un proveedor específico.
 */
const getOrdersByProviderId = async (proveedorId) => {
  const pedidos = await Pedido.findAll({
    where: { proveedor_id: proveedorId },
    include: [{
      model: Usuario,
      attributes: ['nombre', 'email', 'colonia']
    }]
  });
  return pedidos;
};

/**
 * Servicio para registrar un nuevo perfil de proveedor.
 */
const registerProvider = async (providerData, userId) => {
  const { nombre_negocio, telefono, zonas_cobertura } = providerData;
  const existingProvider = await Proveedor.findOne({ where: { usuario_id: userId } });
  if (existingProvider) {
    throw new Error('Este usuario ya está registrado como proveedor.');
  }
  const nuevoProveedor = await Proveedor.create({
    nombre_negocio,
    telefono,
    zonas_cobertura,
    usuario_id: userId,
  });
  return nuevoProveedor;
};

/**
 * Servicio para que un proveedor actualice su perfil.
 */
const updateProviderProfile = async (userId, updateData) => {
  // 1. Encontrar el perfil del proveedor asociado al usuario.
  const proveedor = await Proveedor.findOne({ where: { usuario_id: userId } });
  if (!proveedor) {
    throw new Error('Perfil de proveedor no encontrado para este usuario.');
  }

  // 2. Actualizar solo los campos permitidos.
  if (updateData.telefono !== undefined) {
    proveedor.telefono = updateData.telefono;
  }
  if (updateData.zonas_cobertura !== undefined) {
    proveedor.zonas_cobertura = updateData.zonas_cobertura;
  }

  // 3. Guardar los cambios.
  await proveedor.save();
  return proveedor;
};

// Exporta todas las funciones del servicio
module.exports = {
  getAllProviders,
  getOrdersByProviderId,
  registerProvider,
  updateProviderProfile,
};