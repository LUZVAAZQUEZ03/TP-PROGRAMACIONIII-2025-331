const Venta = require("./venta.js");
const DetalleVenta = require("./detalleVenta.js");
const sequelize = require("../../servicios/sequelize.js"); // conexión
const { Producto } = require("../productos/producto.js");
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


DetalleVenta.belongsTo(Producto, {
    foreignKey: "producto_id",
    as: "producto"
});
module.exports = { Venta, DetalleVenta , Producto};