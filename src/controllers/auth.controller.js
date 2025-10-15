// src/controllers/auth.controller.js

// Importamos el servicio que contiene la lógica de negocio de autenticación.
const authService = require('../services/auth.service');

/**
 * Controlador para manejar el registro de un nuevo usuario.
 * Recibe los datos del usuario, los pasa al servicio y devuelve la respuesta.
 */
const register = async (req, res) => {
  try {
    // 1. Pasamos todos los datos del cuerpo de la petición al servicio de registro.
    const newUser = await authService.registerUser(req.body);
    
    // 2. Si el usuario se crea con éxito, respondemos con un estado 201 (Creado).
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      usuario: newUser,
    });

  } catch (error) {
    // 3. Manejamos los errores que pueda lanzar el servicio.
    if (error.message === 'El correo electrónico ya está registrado') {
      // Si el email ya existe, devolvemos un error 409 (Conflicto).
      return res.status(409).json({ message: error.message });
    }
    // Para cualquier otro error inesperado, devolvemos un error 500.
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

/**
 * Controlador para manejar el inicio de sesión de un usuario.
 * Recibe las credenciales, las pasa al servicio y devuelve un token.
 */
const login = async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    
    // 1. Llamamos al servicio para que verifique las credenciales.
    const token = await authService.loginUser(email, contrasena);
    
    // 2. Si las credenciales son correctas, respondemos con el token JWT.
    res.status(200).json({ token });

  } catch (error) {
    // 3. Por seguridad, no especificamos si falló el email o la contraseña.
    if (error.message === 'Usuario no encontrado' || error.message === 'Contraseña incorrecta') {
      // Devolvemos un error 401 (No Autorizado) con un mensaje genérico.
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    // Para cualquier otro error, devolvemos un error 500.
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Exportamos ambas funciones para que puedan ser usadas en el archivo de rutas.
module.exports = {
  register,
  login,
};