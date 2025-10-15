// index.js (Raíz del proyecto)

const express = require('express');
const { sequelize } = require('./src/models/index');

// Importamos todos los archivos de rutas
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const reporteRoutes = require('./src/routes/reporte.routes');
const proveedorRoutes = require('./src/routes/proveedor.routes');

// Creamos la aplicación de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para que Express pueda entender el formato JSON en las peticiones
app.use(express.json());

// --- Registramos las Rutas ---
// Rutas de autenticación bajo el prefijo '/api/auth'
app.use('/api/auth', authRoutes);
// Rutas de usuario bajo el prefijo '/api/user'
app.use('/api/user', userRoutes);
// Rutas de reportes bajo el prefijo '/api/reportes'
app.use('/api/reportes', reporteRoutes);
// Rutas de proveedores bajo el prefijo '/api/proveedores'
app.use('/api/proveedores', proveedorRoutes);

// Función para iniciar el servidor y la conexión a la base de datos
const startServer = async () => {
  try {
    // 1. Conectamos a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    // 2. Sincronizamos los modelos con la base de datos.
    await sequelize.sync({ force: false });
    console.log('✅ Modelos sincronizados con la base de datos.');

    // 3. Iniciamos el servidor para que escuche peticiones en el puerto definido
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });

  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
  }
};

// Ejecutamos la función para iniciar todo
startServer();