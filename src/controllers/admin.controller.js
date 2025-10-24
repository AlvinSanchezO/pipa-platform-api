// src/controllers/admin.controller.js
const proveedorService = require('../services/proveedor.service');

/**
 * Controlador (Admin) para aprobar un proveedor.
 */
const approveProvider = async (req, res) => {
  try {
    const { providerId } = req.params; // Obtiene el ID del parámetro de la URL

    if (!providerId) {
      return res.status(400).json({ message: 'Se requiere el ID del proveedor.' });
    }

    const proveedorAprobado = await proveedorService.approveProvider(providerId);
    res.status(200).json({ message: 'Proveedor aprobado exitosamente.', proveedor: proveedorAprobado });

  } catch (error) {
    if (error.message.includes('no está pendiente')) {
      return res.status(409).json({ message: error.message }); // 409 Conflict si ya estaba aprobado/rechazado
    }
    if (error.message.includes('no encontrado')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error al aprobar el proveedor', error: error.message });
  }
};

module.exports = {
  approveProvider,
};