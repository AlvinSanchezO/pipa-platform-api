// src/services/auth.service.js

// Importamos el modelo de Usuario para interactuar con la base de datos.
const { Usuario } = require('../models/index');
// Importamos bcryptjs para encriptar la contraseña.
const bcrypt = require('bcryptjs');

/**
 * Servicio para registrar un nuevo usuario en la base de datos.
 * @param {object} userData - Datos del usuario (nombre, email, contrasena, colonia).
 * @returns {Promise<object>} - El objeto del usuario creado (sin la contraseña).
 */
const registerUser = async (userData) => {
  const { nombre, email, contrasena, colonia } = userData;

  // 1. Verificamos si el correo electrónico ya está en uso.
  const emailExists = await Usuario.findOne({ where: { email } });
  if (emailExists) {
    // Si existe, lanzamos un error que será capturado por el controlador.
    throw new Error('El correo electrónico ya está registrado');
  }

  // 2. Encriptamos la contraseña antes de guardarla.
  // 'genSaltSync(10)' genera una "sal" para fortalecer el hash.
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(contrasena, salt);

  // 3. Creamos el nuevo usuario en la base de datos.
  const newUser = await Usuario.create({
    nombre,
    email,
    contrasena: hashedPassword, // Guardamos la contraseña ya encriptada
    colonia,
  });

  // 4. Devolvemos el usuario creado, pero eliminamos la contraseña por seguridad.
  const userJson = newUser.toJSON();
  delete userJson.contrasena;

  return userJson;
};

module.exports = {
  registerUser,
};