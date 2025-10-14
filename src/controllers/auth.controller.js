// src/controllers/auth.controller.js

/**
 * Controlador para manejar el registro de un nuevo usuario.
 * @param {object} req - El objeto de la petición (request).
 * @param {object} res - El objeto de la respuesta (response).
 */
const register = async (req, res) => {
  try {
    // 1. Extraemos los datos del cuerpo de la petición.
    const { nombre, email, contrasena, colonia } = req.body;
    
    // --- TODO: Llamar al servicio de autenticación para crear el usuario ---
    
    // 2. Por ahora, solo respondemos con un mensaje de éxito temporal.
    res.status(201).json({ 
      message: 'Petición de registro recibida correctamente',
      data: { nombre, email, colonia }
    });

  } catch (error) {
    // 3. Si algo sale mal, enviamos una respuesta de error.
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Exportamos la función para que pueda ser usada por el enrutador.
module.exports = {
  register,
};