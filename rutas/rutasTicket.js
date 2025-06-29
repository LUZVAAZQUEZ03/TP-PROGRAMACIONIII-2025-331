const express = require('express');
const router = express.Router();
const ticketController = require('../controller/controllerApis/controllerTicket.js');

router.post('/ticket-pdf', ticketController.createTicket); // Ruta para crear un ticket
module.exports = router;