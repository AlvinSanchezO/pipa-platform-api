// src/models/reporte.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Reporte', {
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['con_agua', 'sin_agua']],
      },
    },
    colonia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};