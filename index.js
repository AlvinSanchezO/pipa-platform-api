// index.js (Raíz del proyecto)

const express = require('express');
const { sequelize } = require('./src/models/index');
const authRoutes = require('./src/routes/auth.routes');

// Creamos la aplicación de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para que Express pueda entender el formato JSON en las peticiones
app.use(express.json());

// --- Registramos las Rutas ---
// Todas las rutas definidas en auth.routes.js estarán bajo el prefijo '/api/auth'
app.use('/api/auth', authRoutes);

// Función para iniciar el servidor y la conexión a la base de datos
const startServer = async () => {
  try {
    // 1. Conectamos a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    // 2. Sincronizamos los modelos con la base de datos.
    // Esto crea las tablas si no existen, basado en nuestros modelos de Sequelize.
    await sequelize.sync({ force: false }); // 'force: false' para no borrar datos existentes
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