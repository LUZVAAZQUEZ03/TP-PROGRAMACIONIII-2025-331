// rutas/rutasCliente.js
const express = require('express');
const router = express.Router();
const vistaCliente = require('../controller/controllerView/controladorVistaCliente'); // Importo el controlador del cliente, donde esta definidas las funciones que responden a cada ruta.

router.get('/productos', vistaCliente.renderProductos);
router.get('/', vistaCliente.renderBienvenidoCliente);
router.get('/carrito', vistaCliente.renderCarritoCliente);
router.get('/ticket', vistaCliente.renderTicket);
module.exports = router;