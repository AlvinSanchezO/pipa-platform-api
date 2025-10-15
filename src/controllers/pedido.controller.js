// src/controllers/pedido.controller.js
const pedidoService = require('../services/pedido.service');

/**
 * Controlador para crear un nuevo pedido.
 */
const createOrder = async (req, res) => {
  try {
    // El ID del usuario que hace el pedido lo obtenemos del token.
    const userId = req.user.id;
    // El ID del proveedor al que se le pide el servicio viene en el cuerpo de la petición.
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

module.exports = {
  createOrder,
};