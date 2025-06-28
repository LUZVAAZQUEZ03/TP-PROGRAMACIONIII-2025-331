const sequelize = require('./servicios/sequelize');
const { Venta, DetalleVenta } = require('./model/ventas/asociaciones');
sequelize.authenticate()
    .then(() => console.log('Conexión exitosa'))
    .catch((err) => console.error('Error al conectar:', err));
sequelize.sync({ alter: true })
    .then(() => {
    console.log("Tablas sincronizadas correctamente");
    })
    .catch(err => {
    console.error("Error al sincronizar tablas:", err);
    });
