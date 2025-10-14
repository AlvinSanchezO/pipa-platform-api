// src/models/usuario.model.js

// Importamos DataTypes para definir los tipos de datos de las columnas.
const { DataTypes } = require('sequelize');

// Exportamos una función que definirá el modelo.
// Recibirá la conexión a la BD (sequelize) como argumento.
module.exports = (sequelize) => {
  // Usamos sequelize.define() para crear el modelo 'Usuario'.
  // Sequelize creará automáticamente la tabla 'Usuarios' (en plural).
  sequelize.define('Usuario', {
    // No necesitamos definir 'id'. Sequelize lo crea por defecto como
    // una clave primaria autoincremental.

    nombre: {
      type: DataTypes.STRING, // Tipo: cadena de texto
      allowNull: false,       // Es un campo obligatorio
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,           // No puede haber dos emails iguales
      validate: {
        isEmail: true,        // Debe tener formato de email
      },
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    colonia: {
      type: DataTypes.STRING,
      allowNull: true,        // Este campo es opcional
    },
  });
};