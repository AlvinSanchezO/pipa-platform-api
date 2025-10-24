// src/controllers/pedido.controller.js
const pedidoService = require('../services/pedido.service');
const { Proveedor } = require('../models/index'); // Make sure Proveedor is imported

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

    if (typeof calificacion !== 'number' || calificacion < 1 || calificacion > 5) {
      return res.status(400).json({ message: 'La calificación debe ser un número entre 1 y 5.' });
    }

    const pedidoActualizado = await pedidoService.rateOrder({
      pedidoId,
      userId,
      calificacion,
      comentario
    });

    res.status(200).json(pedidoActualizado);
  } catch (error) {
    if (error.message === 'Pedido no encontrado o no autorizado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error al calificar el pedido', error: error.message });
  }
};

/**
 * Controlador para que un proveedor actualice el estado de un pedido.
 */
const updateOrderStatus = async (req, res) => {
  try {
    const userId = req.user.id; // User ID from token
    const { pedidoId } = req.params; // Order ID from URL
    const { estado } = req.body; // New status from request body

    // --- 👇 AÑADE ESTOS LOGS ---
    console.log('--- Controlador: updateOrderStatus ---');
    console.log('User ID (from token):', userId);
    console.log('Pedido ID (from URL):', pedidoId);
    console.log('Nuevo Estado:', estado);
    // --- Fin de Logs ---

    const proveedor = await Proveedor.findOne({ where: { usuario_id: userId } });
    if (!proveedor) {
      console.log('Proveedor no encontrado para el usuario ID:', userId); // Log adicional
      return res.status(403).json({ message: 'Acceso denegado. No es una cuenta de proveedor.' });
    }

    console.log('Proveedor ID encontrado:', proveedor.id); // Log adicional

    if (!estado) {
        return res.status(400).json({ message: 'El nuevo estado es requerido.' });
    }

    const pedidoActualizado = await pedidoService.updateOrderStatus({
      pedidoId,
      providerId: proveedor.id,
      nuevoEstado: estado
    });

    res.status(200).json(pedidoActualizado);

  } catch (error) {
    console.error('Error en controlador updateOrderStatus:', error.message); // Log de error
    if (error.message.includes('Estado inválido')) {
        return res.status(400).json({ message: error.message });
    }
    if (error.message.includes('Pedido no encontrado')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error al actualizar el estado del pedido', error: error.message });
  }
};

// Exportamos las CUATRO funciones
module.exports = {
  createOrder,
  getOrders,
  rateOrder,
  updateOrderStatus,
};