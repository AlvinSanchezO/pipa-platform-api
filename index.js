// index.js (Método Manual - Completo)
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/swagger/swagger.json'); // Importa el archivo JSON
const app = express();
const PORT = process.env.PORT || 3000;

// --- Configuración básica (modelos, rutas, etc.) ---
require('dotenv').config();
const { sequelize } = require('./src/models/index');

// Importamos todos los archivos de rutas
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const proveedorRoutes = require('./src/routes/proveedor.routes');
const reporteRoutes = require('./src/routes/reporte.routes');
const pedidoRoutes = require('./src/routes/pedido.routes');

// Middleware para entender JSON
app.use(express.json());

// Usamos todas las rutas con sus prefijos
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/reportes', reporteRoutes);
app.use('/api/pedidos', pedidoRoutes);

// --- Configuración de Swagger ---
// Le pasamos el archivo JSON a swagger-ui-express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- Inicio del Servidor ---
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida.');
    await sequelize.sync({ force: false });
    console.log('✅ Modelos sincronizados.');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
      console.log(`📘 Documentación en http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar:', error);
  }
};

startServer();