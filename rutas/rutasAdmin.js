const express = require('express');
const router = express.Router();
const controlador = require('../controller/controllerApis/contollerApiAdmin.js');
const vistaAdmin = require('../controller/controllerView/controladorVistaAdmin');
const upload = require('../servicios/multer.js');
const verificarToken = require('../servicios/jwt.js');

const { render } = require('ejs');

// Ruta al login
router.get('/', vistaAdmin.renderLog);

// Ruta al dashboard
router.get('/dashboard',verificarToken, controlador.getAll);

// Ruta para formulario de alta
router.get('/formABMproductos', vistaAdmin.renderAlta);

// Ruta a crear user
router.get('/createUser', vistaAdmin.renderCreate);

//ruta a formulario modificar
router.get('/formABMproductos/:id', vistaAdmin.renderFormEditar);

//ruta salir
router.get('/logout', controlador.logOut)

//rutas post
//posteo nuevo producto
router.post('/nuevoProducto', upload.single('foto'), controlador.createProd) //crea productos

//posteo producto modificado
router.post('/producto/modificar/:id', upload.single('foto'), controlador.update); //carag el form con el producto a editar 

//con editado posteo y reenvio al dashboard si todo esta correcto
router.put('/editado', vistaAdmin.renderDashboard) //una vez editado

//descativa producto por id
router.post('/desactivar/:id', controlador.desactivar);

//activa producto por id
router.post('/activar/:id', controlador.activar);

//posteo y envio desde inicio de sesion al dashboard
router.post('/dashboard', controlador.ingresar);

//posteo y envio a "/" para que inicie sesion
router.post('/', controlador.createUser)


module.exports = router; 