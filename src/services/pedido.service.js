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

  // Creamos el nuevo pedido. El estado por defecto será 'pendiente'.
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
  // Usamos findAll con una condición 'where' para filtrar por el usuario.
  const pedidos = await Pedido.findAll({
    where: { usuario_id: userId },
    // Usamos 'include' para unir la tabla de Proveedores y traer datos adicionales.
    include: [{
      model: Proveedor,
      // Especificamos qué campos del proveedor queremos mostrar para una respuesta más limpia.
      attributes: ['nombre_negocio', 'telefono']
    }]
  });

  return pedidos;
};

// Exportamos ambas funciones para que estén disponibles para el controlador.
module.exports = {
  createOrder,
  getOrdersByUserId,
};