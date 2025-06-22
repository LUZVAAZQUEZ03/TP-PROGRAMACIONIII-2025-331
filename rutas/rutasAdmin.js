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

//
router.get('/formABMproductos/:id', vistaAdmin.renderFormEditar);

//rutas post
router.post('/nuevoProducto', controlador.createProd) //crea productos

router.post('/editado', vistaAdmin.renderDashboard) //una vez editado

router.post('/producto/modificar/:id', controlador.update); //

router.post('/desactivar/:id', controlador.desactivar);

router.post('/activar/:id', controlador.activar);

router.post('/dashboard', controlador.ingresar);

router.post('/', controlador.createUser)
//render.post('/createUser', )

//render.post('/log', )

module.exports = router; 