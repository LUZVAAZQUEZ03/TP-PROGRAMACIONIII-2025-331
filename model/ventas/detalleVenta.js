const sequelize = require("../../servicios/sequelize");
const { DataTypes } = require("sequelize");

const DetalleVenta = sequelize.define("DetalleVenta", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ventaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ventas',
            key: 'id'
        }
    },
    productoId: { type: DataTypes.INTEGER, allowNull: false },

    cantidad: { type: DataTypes.INTEGER, allowNull: false },

    precioUnitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    
    subtotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, {
    tableName: 'detalles_venta',
    timestamps: false
});

module.exports =DetalleVenta;