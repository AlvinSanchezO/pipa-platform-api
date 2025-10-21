// src/models/index.js
const { sequelize } = require('../config/database');

// Importar los modelos
const UsuarioModel = require('./usuario.model');
const ProveedorModel = require('./proveedor.model');
const PedidoModel = require('./pedido.model');
const ReporteModel = require('./reporte.model');

// Inicializar los modelos
const Usuario = UsuarioModel(sequelize);
const Proveedor = ProveedorModel(sequelize);
const Pedido = PedidoModel(sequelize);
const Reporte = ReporteModel(sequelize);

// --- Definir las Relaciones ---

// Un Usuario puede tener un (perfil de) Proveedor.
Usuario.hasOne(Proveedor, { foreignKey: 'usuario_id' });
Proveedor.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un Usuario tiene muchos Pedidos
Usuario.hasMany(Pedido, { foreignKey: 'usuario_id' });
Pedido.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un Proveedor tiene muchos Pedidos
Proveedor.hasMany(Pedido, { foreignKey: 'proveedor_id' });
Pedido.belongsTo(Proveedor, { foreignKey: 'proveedor_id' });

// Un Usuario tiene muchos Reportes
Usuario.hasMany(Reporte, { foreignKey: 'usuario_id' });
Reporte.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Exportar todo
module.exports = {
  sequelize,
  Usuario,
  Proveedor,
  Pedido,
  Reporte,
};