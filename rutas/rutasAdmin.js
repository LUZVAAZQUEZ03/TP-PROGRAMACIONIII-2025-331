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
router.post('/nuevoProducto', vistaAdmin.renderDashboard) 
//segun yo esto tendría que usar la api en post y agregar a la bd, cómo? no tengo puta ideaa
router.get('/formABMproductos/:id', vistaAdmin.renderFormEditar);

router.post('/editado',vistaAdmin.renderDashboard)

router.post('/desactivar/:id', controlador.desactivar);

router.post('/activar/:id', controlador.activar);






module.exports = router; 