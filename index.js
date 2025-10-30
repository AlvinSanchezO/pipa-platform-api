// index.js (Raíz del proyecto)
const express = require('express');
const cors = require('cors'); // 👈 1. Importa cors
const { sequelize } = require('./src/config/database');

// Importamos todos los archivos de rutas
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const reporteRoutes = require('./src/routes/reporte.routes');
const proveedorRoutes = require('./src/routes/proveedor.routes');
const pedidoRoutes = require('./src/routes/pedido.routes');
const adminRoutes = require('./src/routes/admin.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 👇 2. Usa el middleware de cors
// Esto le dice a tu API que acepte peticiones de CUALQUIER origen.
app.use(cors());

// --- Registramos las Rutas de la API ---
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/reportes', reporteRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/admin', adminRoutes);

// --- Función para iniciar el servidor ---
const startServer = async () => {
  try {
    require('dotenv').config();
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    // Asegúrate de que esto esté en force: false para uso normal
    await sequelize.sync({ force: false });
    console.log('✅ Modelos sincronizados con la base de datos.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });

  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
  }
};