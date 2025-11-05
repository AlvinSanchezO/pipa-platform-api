// src/config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT || 5432,
  dialect: 'postgres',
  logging: false,

  // --- AÑADE ESTO PARA RENDER ---
  // Render requiere conexiones SSL, pero no para desarrollo local
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Necesario para evitar errores de certificado en Render
    }
  },
  // --- FIN DE LA ADICIÓN ---
});

module.exports = { sequelize };