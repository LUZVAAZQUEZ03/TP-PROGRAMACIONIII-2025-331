const express = require("express");
const router = express.Router();
const ventasController = require("../controller/controllerApis/controllerVentas.js");

router.post("/crear", ventasController.createVenta);

module.exports = router;