const Venta = require("./venta.js");
const DetalleVenta = require("./detalleVenta.js");
const sequelize = require("../../servicios/sequelize.js"); // conexión
const { DataTypes } = require("sequelize");
// Asociaciones
Venta.hasMany(DetalleVenta, {
    foreignKey: 'venta_id',
    as: 'detalles'
});

DetalleVenta.belongsTo(Venta, {
    foreignKey: 'venta_id',
    as: 'venta'
});

module.exports = { Venta, DetalleVenta };