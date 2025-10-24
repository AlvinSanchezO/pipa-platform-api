// src/services/proveedor.service.js
const { Proveedor, Pedido, Usuario } = require('../models/index'); // Make sure Usuario is imported

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
    include: [{
      model: Usuario,
      attributes: ['nombre', 'email', 'colonia']
    }]
  });
  return pedidos;
};

/**
 * Servicio para registrar un nuevo perfil de proveedor.
 * @param {object} providerData - Datos del proveedor (nombre_negocio, telefono, etc.).
 * @param {number} userId - ID del usuario que se está registrando como proveedor.
 * @returns {Promise<object>} - El objeto del proveedor creado.
 */
const registerProvider = async (providerData, userId) => {
  const { nombre_negocio, telefono, zonas_cobertura } = providerData;

  // 1. Verificar si este usuario ya tiene un perfil de proveedor
  const existingProvider = await Proveedor.findOne({ where: { usuario_id: userId } });
  if (existingProvider) {
    throw new Error('Este usuario ya está registrado como proveedor.');
  }

  // 2. Crear el nuevo perfil de proveedor, vinculándolo al usuario
  const nuevoProveedor = await Proveedor.create({
    nombre_negocio,
    telefono,
    zonas_cobertura,
    usuario_id: userId, // Vincula al usuario existente
    // calificacion_promedio tendrá el valor por defecto (0)
  });

  return nuevoProveedor;
};

// Exporta todas las funciones del servicio
module.exports = {
  getAllProviders,
  getOrdersByProviderId,
  registerProvider,
};