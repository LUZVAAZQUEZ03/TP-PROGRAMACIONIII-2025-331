const express = require('express');
const router = express.Router();
const controlador = require('../controller/controllerApis/contollerApiAdmin.js');

router.get('/', controlador.getAll);

module.exports = router;
