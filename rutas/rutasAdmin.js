const express = require('express');
const router = express.Router();
const vistaAdmin = require('../controller/controllerView/controladorVistaAdmin');
const { render } = require('ejs');

// Ruta al login
router.get('/', vistaAdmin.renderLog);

// Ruta al dashboard
router.get('/dashboard', vistaAdmin.renderDashboard);

// Ruta para formulario de alta
router.get('/formABMproductos', vistaAdmin.renderAlta);

router.get('/createUser', vistaAdmin.renderCreate);

module.exports = router;
