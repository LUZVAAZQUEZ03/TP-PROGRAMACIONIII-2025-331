const sequelize = require("../../servicios/sequelize.js"); // conexión
const { DataTypes } = require("sequelize"); 

const Venta = sequelize.define("Venta", {
    id: { type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true },

    cliente: { type: DataTypes.STRING },
    
    fecha: { type: DataTypes.DATE,
        defaultValue: DataTypes.NOW },

    total: { type: DataTypes.DECIMAL(10, 2) }

    }, 
    {
    tableName: 'ventas',
    timestamps: false
    });


module.exports =Venta;