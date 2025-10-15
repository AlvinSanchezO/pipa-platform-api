// src/services/pedido.service.js
const { Pedido } = require('../models/index');

/**
 * Servicio para crear un nuevo pedido.
 * @param {object} orderData - Contiene el ID del usuario y del proveedor.
 * @returns {Promise<object>} - El objeto del pedido recién creado.
 */
const createOrder = async (orderData) => {
  const { userId, providerId } = orderData;

  // Creamos el nuevo pedido en la base de datos.
  // El estado por defecto será 'pendiente' como definimos en el modelo.
  const nuevoPedido = await Pedido.create({
    usuario_id: userId,
    proveedor_id: providerId,
  });

  return nuevoPedido;
};

module.exports = {
  createOrder,
};