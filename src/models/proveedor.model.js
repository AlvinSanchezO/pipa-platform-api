// src/models/proveedor.model.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Definimos el modelo 'Proveedor', que creará la tabla 'Proveedores'.
  sequelize.define('Proveedor', {
    nombre_negocio: {
      type: DataTypes.STRING,
      allowNull: false, // El nombre del negocio es obligatorio.
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true, // El teléfono es opcional.
    },
    zonas_cobertura: {
      type: DataTypes.TEXT, // Usamos TEXT para descripciones potencialmente largas.
      allowNull: true,
    },
    calificacion_promedio: {
      type: DataTypes.FLOAT, // Usamos FLOAT para calificaciones con decimales (ej. 4.5).
      allowNull: false,
      defaultValue: 0, // Por defecto, un nuevo proveedor inicia con 0.
    },
  });
};