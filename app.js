// ──────────────────────────────────────────────────────────────────────
// Requerimientos y configuración básica
// ──────────────────────────────────────────────────────────────────────
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config(); // .env para variables de entorno

// ──────────────────────────────────────────────────────────────────────
// Rutas
// ──────────────────────────────────────────────────────────────────────
const rutasAdmin = require("./rutas/rutasAdmin.js");
const rutasCliente = require("./rutas/rutasCliente.js");
const rutasProductos = require("./rutas/rutasApi.js");
const rutasVentas = require("./rutas/rutasVentas.js");
const rutasTicket = require("./rutas/rutasTicket.js");

// ──────────────────────────────────────────────────────────────────────
//Configuración del servidor
// ──────────────────────────────────────────────────────────────────────
const port = process.env.PORT || 6000;

const configApi = (app) => {
    // Parseo de JSON y formularios
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));

    // Cookies
    app.use(cookieParser());

    //  CORS (permitir todos los orIgenes por defecto)
    app.use(cors());
    // para restringirlo: app.use(cors({ origin: 'http://localhost:5502' }));
    //Middleware para manejar errores de login por query
    app.use((req, res, next) => {
        if (req.query.error) {
            res.locals.error = req.query.error;
        }
        next();
    });

    //Archivos estáticos (HTML, CSS, JS, imágenes)
    app.use(express.static(path.join(__dirname, 'estatico')));
    app.use(express.static('public'));

    //Motor de vistas (EJS)
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'vista'));

    // ──────────────────────────────────────────────────────────────────────
    //Rutas
    // ──────────────────────────────────────────────────────────────────────
    app.use('/admin', rutasAdmin); // Admin
    app.use('/cliente', rutasCliente); // Cliente
    app.use('/api/productos', rutasProductos); // Productos API
    app.use('/api/ventas', rutasVentas); // Ventas API
    app.use('/ticket', rutasTicket); // Ticket PDF
};

// ──────────────────────────────────────────────────────────────────────
// Inicialización del servidor
// ──────────────────────────────────────────────────────────────────────
const init = () => {
    const app = express();
    configApi(app);

    app.listen(port, '0.0.0.0', () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
};

init();

