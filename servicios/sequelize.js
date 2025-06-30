const {Sequelize} = require('sequelize');
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        logging: false, // Desactiva el logging de consultas SQL
        pool: {
            max: 12, // Número máximo de conexiones en el pool
            min: 0, // Número mínimo de conexiones en el pool
            acquire: 30000, // Tiempo máximo en milisegundos que el pool intentará adquirir una conexión antes de lanzar un error
            idle: 10000 // Tiempo máximo en milisegundos que una conexión puede estar inactiva antes de ser liberada
        }
    }
); 
module.exports = sequelize; 