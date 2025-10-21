// src/models/proveedor.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Proveedor', {
    nombre_negocio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zonas_cobertura: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    calificacion_promedio: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    // usuario_id is added automatically via association
  });
};