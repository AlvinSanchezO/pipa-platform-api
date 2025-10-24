// src/middleware/admin.middleware.js

/**
 * Middleware para verificar si el usuario autenticado tiene el rol de 'admin'.
 * Debe usarse DESPUÉS del middleware verifyToken.
 * @param {object} req - Objeto de petición de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @param {function} next - Función para pasar al siguiente middleware o controlador.
 */
const isAdmin = (req, res, next) => {
  // Verificamos si req.user existe y si el rol es 'admin'.
  if (req.user && req.user.rol === 'admin') {
    // Si es admin, permite que la petición continúe.
    next();
  } else {
    // Si no es admin, envía una respuesta de error 403 (Prohibido).
    res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
  }
};

module.exports = {
  isAdmin,
};