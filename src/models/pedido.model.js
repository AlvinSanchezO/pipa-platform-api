// src/models/pedido.model.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Definimos el modelo 'Pedido', que creará la tabla 'Pedidos'.
  sequelize.define('Pedido', {
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      // Un pedido siempre se crea con el estado 'pendiente'.
      defaultValue: 'pendiente',
    },
    calificacion: {
      type: DataTypes.INTEGER,
      // La calificación es opcional, se añade solo después de completar el servicio.
      allowNull: true,
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: true, // El comentario también es opcional.
    },

    // IMPORTANTE: No necesitamos definir 'usuario_id' ni 'proveedor_id' aquí.
    // Sequelize los añadirá automáticamente cuando definamos las relaciones
    // (belongsTo) en nuestro archivo index de modelos.

  });
};