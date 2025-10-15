// src/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar el token JWT y proteger rutas.
 */
const verifyToken = (req, res, next) => {
  // 1. Obtenemos el token del encabezado 'Authorization'.
  // Formato esperado: "Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // 2. Si no hay token, enviamos un error 403 (Prohibido).
  if (!token) {
    return res.status(403).json({ message: 'No se proveyó un token.' });
  }

  // 3. Verificamos la validez del token.
  jwt.verify(token, 'TU_SECRETO_JWT', (err, decoded) => {
    if (err) {
      // Si el token no es válido (expirado, manipulado), enviamos un error 401.
      return res.status(401).json({ message: 'No autorizado. Token inválido.' });
    }

    // 4. Si el token es válido, guardamos los datos del usuario en la petición.
    // Esto permite que los siguientes controladores sepan quién está haciendo la petición.
    req.user = decoded;
    next(); // Permite que la petición continúe hacia el controlador final.
  });
};

module.exports = {
  verifyToken,
};