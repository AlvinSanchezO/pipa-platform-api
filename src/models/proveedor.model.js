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
    // NUEVO CAMPO: Estado del proveedor
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pendiente', // Por defecto, todos inician como pendientes
      validate: {
        // Aseguramos que el estado sea uno de los valores permitidos
        isIn: [['pendiente', 'aprobado', 'rechazado', 'suspendido']]
      }
    }
    // usuario_id es añadido por la relación en index.js
  }, {
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
  });
};