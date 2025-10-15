// src/controllers/pedido.controller.js

// Importamos el servicio que contiene la lógica de negocio de los pedidos.
const pedidoService = require('../services/pedido.service');

/**
 * Controlador para crear un nuevo pedido.
 */
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { providerId } = req.body;

    if (!providerId) {
      return res.status(400).json({ message: 'El ID del proveedor es requerido.' });
    }

    const nuevoPedido = await pedidoService.createOrder({ userId, providerId });
    res.status(201).json(nuevoPedido);

  } catch (error) {
    res.status(500).json({ message: 'Error al crear el pedido', error: error.message });
  }
};

/**
 * Controlador para obtener los pedidos del usuario autenticado.
 */
const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const pedidos = await pedidoService.getOrdersByUserId(userId);
    res.status(200).json(pedidos);

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos', error: error.message });
  }
};

/**
 * Controlador para que un usuario califique uno de sus pedidos.
 */
const rateOrder = async (req, res) => {
  try {
    const userId = req.user.id;                   // ID del usuario que califica (desde el token)
    const { pedidoId } = req.params;              // ID del pedido a calificar (desde la URL)
    const { calificacion, comentario } = req.body;  // Datos de la calificación (desde el body)

    // Validamos que la calificación sea un número entre 1 y 5.
    if (typeof calificacion !== 'number' || calificacion < 1 || calificacion > 5) {
      return res.status(400).json({ message: 'La calificación debe ser un número entre 1 y 5.' });
    }

    // Llamamos al servicio para actualizar el pedido.
    const pedidoActualizado = await pedidoService.rateOrder({
      pedidoId,
      userId,
      calificacion,
      comentario
    });

    res.status(200).json(pedidoActualizado);
  } catch (error) {
    // Si el servicio lanza un error de "no encontrado", respondemos con 404.
    if (error.message === 'Pedido no encontrado o no autorizado') {
      return res.status(404).json({ message: error.message });
    }
    // Para otros errores, respondemos con 500.
    res.status(500).json({ message: 'Error al calificar el pedido', error: error.message });
  }
};

// Exportamos todas las funciones.
module.exports = {
  createOrder,
  getOrders,
  rateOrder,
};