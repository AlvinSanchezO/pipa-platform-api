// src/controllers/auth.controller.js

// Importamos el servicio de autenticación.
const authService = require('../services/auth.service');

/**
 * Controlador para manejar el registro de un nuevo usuario.
 */
const register = async (req, res) => {
  try {
    // 1. Pasamos todos los datos del cuerpo de la petición al servicio.
    const newUser = await authService.registerUser(req.body);
    
    // 2. Si el servicio se ejecuta sin errores, respondemos con el usuario creado.
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      usuario: newUser,
    });

  } catch (error) {
    // 3. Manejamos los errores que pueda lanzar el servicio.
    if (error.message === 'El correo electrónico ya está registrado') {
      // Si el email ya existe, enviamos un error 409 (Conflicto).
      return res.status(409).json({ message: error.message });
    }
    // Para cualquier otro error, enviamos un error 500 (Error del Servidor).
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

module.exports = {
  register,
};