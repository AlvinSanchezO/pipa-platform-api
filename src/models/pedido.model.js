// src/models/pedido.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Pedido', {
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pendiente',
    },
    calificacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // usuario_id and proveedor_id are added automatically via association
  });
};