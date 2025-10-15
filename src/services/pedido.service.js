// src/services/pedido.service.js

// Importamos los modelos necesarios. 'Proveedor' es requerido para el 'include'.
const { Pedido, Proveedor } = require('../models/index');

/**
 * Servicio para crear un nuevo pedido en la base de datos.
 * @param {object} orderData - Contiene el ID del usuario y del proveedor.
 * @returns {Promise<object>} - El objeto del pedido recién creado.
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
 * @param {number} userId - El ID del usuario que solicita su historial.
 * @returns {Promise<Array>} - Un arreglo con todos los pedidos del usuario.
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
 * @param {object} data - Contiene ID del pedido, ID del usuario, calificación y comentario.
 * @returns {Promise<object>} - El pedido actualizado.
 */
const rateOrder = async (data) => {
  const { pedidoId, userId, calificacion, comentario } = data;

  // 1. Buscamos el pedido específico, asegurándonos de que pertenezca al usuario que hace la petición.
  // Esta es una importante medida de seguridad.
  const pedido = await Pedido.findOne({
    where: { id: pedidoId, usuario_id: userId }
  });

  // 2. Si no se encuentra el pedido (o no pertenece al usuario), lanzamos un error.
  if (!pedido) {
    throw new Error('Pedido no encontrado o no autorizado');
  }

  // 3. Actualizamos los campos del pedido con la nueva información.
  pedido.calificacion = calificacion;
  pedido.comentario = comentario;
  
  // 4. Guardamos los cambios en la base de datos.
  await pedido.save();

  return pedido;
};

// Exportamos todas las funciones para que estén disponibles para el controlador.
module.exports = {
  createOrder,
  getOrdersByUserId,
  rateOrder,
};