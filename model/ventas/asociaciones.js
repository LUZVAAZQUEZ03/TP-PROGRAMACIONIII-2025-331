const Venta = require("./venta.js");
const DetalleVenta = require("./detalleVenta.js");
const sequelize = require("../../servicios/sequelize.js"); // conexión
const { DataTypes } = require("sequelize");
// Asociaciones
Venta.hasMany(DetalleVenta, {
    foreignKey: 'ventaId',
    as: 'detalles'
});

DetalleVenta.belongsTo(Venta, {
    foreignKey: 'ventaId',
    as: 'venta'
});

module.exports = { Venta, DetalleVenta };