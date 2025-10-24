// src/services/pedido.service.js
const { Pedido, Proveedor, Usuario } = require('../models/index');

/**
 * Servicio para crear un nuevo pedido en la base de datos.
 */
const createOrder = async (orderData) => {
  const { userId, providerId } = orderData;
  const nuevoPedido = await Pedido.create({
    usuario_id: userId,
    proveedor_id: providerId,
  });
  return nuevoPedido;
};

/**
 * Servicio para obtener todos los pedidos de un usuario específico.
 */
const getOrdersByUserId = async (userId) => {
  const pedidos = await Pedido.findAll({
    where: { usuario_id: userId },
    include: [{
      model: Proveedor,
      attributes: ['nombre_negocio', 'telefono']
    }]
  });
  return pedidos;
};

/**
 * Servicio para que un usuario califique uno de sus pedidos.
 */
const rateOrder = async (data) => {
  const { pedidoId, userId, calificacion, comentario } = data;
  const pedido = await Pedido.findOne({
    where: { id: pedidoId, usuario_id: userId }
  });

  if (!pedido) {
    throw new Error('Pedido no encontrado o no autorizado');
  }

  pedido.calificacion = calificacion;
  pedido.comentario = comentario;
  await pedido.save();
  return pedido;
};

/**
 * Servicio para que un proveedor actualice el estado de un pedido.
 */
const updateOrderStatus = async (data) => {
  const { pedidoId, providerId, nuevoEstado } = data;

  // --- 👇 AÑADE ESTOS LOGS ---
  console.log('--- Servicio: updateOrderStatus ---');
  console.log('Buscando Pedido ID:', pedidoId);
  console.log('Para Proveedor ID:', providerId);
  // --- Fin de Logs ---

  const pedido = await Pedido.findOne({
    where: { id: pedidoId, proveedor_id: providerId }
  });

  if (!pedido) {
    console.log('Pedido no encontrado en el servicio con esos IDs.'); // Log adicional
    throw new Error('Pedido no encontrado o no pertenece a este proveedor');
  }

  const estadosPermitidos = ['en camino', 'completado', 'cancelado'];
  if (!estadosPermitidos.includes(nuevoEstado)) {
    throw new Error(`Estado inválido. Los estados permitidos son: ${estadosPermitidos.join(', ')}`);
  }

  pedido.estado = nuevoEstado;
  await pedido.save();

  return pedido;
};

// Exportamos todas las funciones
module.exports = {
  createOrder,
  getOrdersByUserId,
  rateOrder,
  updateOrderStatus,
};