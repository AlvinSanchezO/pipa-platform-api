// src/models/index.js

// 1. Importamos la conexión a la base de datos
const { sequelize } = require('../config/database');

// 2. Importamos las funciones que definen cada modelo
const UsuarioModel = require('./usuario.model');
const ProveedorModel = require('./proveedor.model');
const PedidoModel = require('./pedido.model');
const ReporteModel = require('./reporte.model');

// 3. Inicializamos cada modelo pasándole la conexión (sequelize)
const Usuario = UsuarioModel(sequelize);
const Proveedor = ProveedorModel(sequelize);
const Pedido = PedidoModel(sequelize);
const Reporte = ReporteModel(sequelize);

// --- 4. Definimos las Relaciones ---

// Un Usuario puede tener muchos Pedidos
Usuario.hasMany(Pedido, { foreignKey: 'usuario_id' });
// Un Pedido pertenece a un solo Usuario
Pedido.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un Proveedor puede tener muchos Pedidos
Proveedor.hasMany(Pedido, { foreignKey: 'proveedor_id' });
// Un Pedido pertenece a un solo Proveedor
Pedido.belongsTo(Proveedor, { foreignKey: 'proveedor_id' });

// Un Usuario puede hacer muchos Reportes
Usuario.hasMany(Reporte, { foreignKey: 'usuario_id' });
// Un Reporte pertenece a un solo Usuario
Reporte.belongsTo(Usuario, { foreignKey: 'usuario_id' });


// 5. Exportamos todos los modelos inicializados y la conexión
module.exports = {
  sequelize,
  Usuario,
  Proveedor,
  Pedido,
  Reporte,
};