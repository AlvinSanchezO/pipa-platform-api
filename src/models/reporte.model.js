// src/models/reporte.model.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Definimos el modelo 'Reporte', que creará la tabla 'Reportes'.
  sequelize.define('Reporte', {
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      // Agregamos una validación para asegurar que el valor sea uno de estos dos.
      // Esto previene datos incorrectos en la base de datos.
      validate: {
        isIn: [['con_agua', 'sin_agua']],
      },
    },
    colonia: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // La columna 'usuario_id' que conecta con la tabla 'Usuarios'
    // será añadida automáticamente por Sequelize cuando definamos las relaciones.

  });
};