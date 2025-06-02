const express = require('express');
const router = express.Router();
const controlador = require('../controller/controllerApis/contollerApiAdmin.js');

router.get('/', controlador.getAll);
router.post('/create', controlador.create);
router.put('/update/:id', controlador.update);
router.patch('/activar/:id', controlador.activar);

module.exports = router;
