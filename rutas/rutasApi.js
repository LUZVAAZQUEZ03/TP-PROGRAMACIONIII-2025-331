const express = require('express');
const router = express.Router();
//const override = require('method-override');
const controlador = require('../controller/controllerApis/contollerApiAdmin.js');

router.get('/paginacion', controlador.getPaginacion); //paginacion
router.get('/count', controlador.countActivos); //cuenta activos
router.get('/', controlador.getAll); //trae todos
router.get('/activos', controlador.getActive); //trae activos
router.post('/create', controlador.createProd); //crea
router.put('/update/:id', controlador.update); //actualiza
router.patch('/desactivar/:id', controlador.desactivar); //desactiva /da de baja
router.put('/activar/:id', controlador.activar); //activa producto

module.exports = router;
