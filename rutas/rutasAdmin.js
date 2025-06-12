const express = require('express');
const router = express.Router();
const controlador = require('../controller/controllerApis/contollerApiAdmin.js');
const vistaAdmin = require('../controller/controllerView/controladorVistaAdmin');
const { render } = require('ejs');

// Ruta al login
router.get('/', vistaAdmin.renderLog);

// Ruta al dashboard
router.get('/dashboard', controlador.getAll);

// Ruta para formulario de alta
router.get('/formABMproductos', vistaAdmin.renderAlta);

// Ruta a crear user
router.get('/createUser', vistaAdmin.renderCreate);

//rutas post
router.post('/nuevoProducto', vistaAdmin.renderAlta)
router.get('/formABMproductos/:id', vistaAdmin.renderFormEditar);

module.exports = router;