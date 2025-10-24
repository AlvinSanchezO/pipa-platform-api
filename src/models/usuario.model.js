// src/models/usuario.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Usuario', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    colonia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // NUEVO CAMPO: Rol del usuario
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'cliente', // Por defecto, todos son clientes
      validate: {
        isIn: [['cliente', 'proveedor', 'admin']] // Roles permitidos
      }
    }
    // Sequelize maneja createdAt y updatedAt (o fecha_creacion/actualizacion si lo configuraste)
  });
};