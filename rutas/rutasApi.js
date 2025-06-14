const express = require('express');
const router = express.Router();
const controlador = require('../controller/controllerApis/contollerApiAdmin.js');

router.get('/', controlador.getAll); //trae todos
router.get('/activos', controlador.getActivos); //trae activos
router.post('/create', controlador.create); //crea
router.put('/update/:id', controlador.actualizar); //actualiza
router.patch('/desactivar/:id', controlador.desactivar); //desactiva /da de baja
router.patch('/activar/:id', controlador.activar); //activa producto

module.exports = router;
