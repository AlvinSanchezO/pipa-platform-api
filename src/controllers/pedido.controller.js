// src/controllers/pedido.controller.js

// Importamos el servicio que contiene la lógica de negocio de los pedidos.
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

    // Verificamos que se haya enviado el ID del proveedor.
    if (!providerId) {
      return res.status(400).json({ message: 'El ID del proveedor es requerido.' });
    }

    // Llamamos al servicio para crear el pedido.
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
    // El ID del usuario lo obtenemos del token JWT, asegurando que solo vea sus pedidos.
    const userId = req.user.id;
    
    // Llamamos al servicio para obtener el historial de pedidos.
    const pedidos = await pedidoService.getOrdersByUserId(userId);
    res.status(200).json(pedidos);

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos', error: error.message });
  }
};

// Exportamos ambas funciones para que estén disponibles para el archivo de rutas.
module.exports = {
  createOrder,
  getOrders,
};