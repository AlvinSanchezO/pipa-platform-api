// src/services/proveedor.service.js
const { Proveedor, Pedido, Usuario } = require('../models/index'); // Asegúrate de importar Usuario y Pedido

/**
 * Servicio para obtener todos los proveedores (solo aprobados).
 */
const getAllProviders = async () => {
  const proveedores = await Proveedor.findAll({
    // Solo mostramos proveedores aprobados en la lista pública
    where: { estado: 'aprobado' },
    attributes: { exclude: ['fecha_creacion', 'fecha_actualizacion', 'estado', 'usuario_id'] } // Ocultamos campos internos
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
 * Servicio para registrar un nuevo perfil de proveedor (estado inicial: pendiente).
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
    // El estado se establece automáticamente como 'pendiente' por el defaultValue.
  });

  return nuevoProveedor;
};

/**
 * Servicio para que un proveedor actualice su perfil.
 */
const updateProviderProfile = async (userId, updateData) => {
  const proveedor = await Proveedor.findOne({ where: { usuario_id: userId } });
  if (!proveedor) {
    throw new Error('Perfil de proveedor no encontrado para este usuario.');
  }

  if (updateData.telefono !== undefined) {
    proveedor.telefono = updateData.telefono;
  }
  if (updateData.zonas_cobertura !== undefined) {
    proveedor.zonas_cobertura = updateData.zonas_cobertura;
  }

  await proveedor.save();
  return proveedor;
};

// Exporta todas las funciones
module.exports = {
  getAllProviders,
  getOrdersByProviderId,
  registerProvider,
  updateProviderProfile,
};