const mysql = require('mysql2');
require('dotenv').config();


const conexion = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port : process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});

conexion.getConnection((err, conn) => {
    if (err) throw err;
    console.log(`Conectado a la base de datos ${process.env.DB_NAME}`);
    conn.release();
});
module.exports = conexion;