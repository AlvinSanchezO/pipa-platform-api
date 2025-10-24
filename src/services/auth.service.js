// src/services/auth.service.js

const { Usuario } = require('../models/index'); // Modelo para interactuar con la tabla de usuarios
const bcrypt = require('bcryptjs');             // Para encriptar y comparar contraseñas
const jwt = require('jsonwebtoken');            // Para generar JSON Web Tokens

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
    throw new Error('El correo electrónico ya está registrado');
  }

  // 2. Encriptamos la contraseña antes de guardarla.
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(contrasena, salt);

  // 3. Creamos el nuevo usuario en la base de datos.
  const newUser = await Usuario.create({
    nombre,
    email,
    contrasena: hashedPassword,
    colonia,
    // El rol se establece por defecto como 'cliente' en el modelo
  });

  // 4. Devolvemos el usuario creado, pero eliminamos la contraseña por seguridad.
  const userJson = newUser.toJSON();
  delete userJson.contrasena;

  return userJson;
};

/**
 * Servicio para autenticar un usuario y generar un JWT.
 * @param {string} email
 * @param {string} contrasena
 * @returns {Promise<string>} - El JSON Web Token.
 */
const loginUser = async (email, contrasena) => {
  // 1. Buscamos al usuario por su correo electrónico.
  const user = await Usuario.findOne({ where: { email } });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // 2. Comparamos la contraseña enviada con la que está en la BD.
  const isPasswordCorrect = bcrypt.compareSync(contrasena, user.contrasena);
  if (!isPasswordCorrect) {
    throw new Error('Contraseña incorrecta');
  }

  // 3. Si las credenciales son correctas, generamos el JWT.
  // 👇 INCLUIMOS el 'rol' en el payload del token.
  const payload = { id: user.id, email: user.email, rol: user.rol };
  // NOTA: 'TU_SECRETO_JWT' debe ser una variable de entorno en un proyecto real.
  const token = jwt.sign(payload, 'TU_SECRETO_JWT', { expiresIn: '1h' });

  return token;
};

// Exportamos ambas funciones para que puedan ser usadas por el controlador.
module.exports = {
  registerUser,
  loginUser,
};