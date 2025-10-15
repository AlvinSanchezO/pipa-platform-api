// src/controllers/user.controller.js
const { Usuario } = require('../models/index');

const getProfile = async (req, res) => {
  try {
    // Gracias al middleware, ahora tenemos 'req.user.id'
    const user = await Usuario.findByPk(req.user.id, {
      attributes: { exclude: ['contrasena'] } // Excluimos la contraseña por seguridad
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

module.exports = {
  getProfile,
};