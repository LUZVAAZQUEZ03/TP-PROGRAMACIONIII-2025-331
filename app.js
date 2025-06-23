const express = require('express')
const cors = require('cors');
const path = require('path');
require('dotenv').config(); //npm install dotenv para utilizar el env y no tener puerto publico

const rutasAdmin = require("./rutas/rutasAdmin.js")
const rutasCliente = require("./rutas/rutasCliente.js");//exporto las rutas de los htmsls de cliente
const rutasProductos = require("./rutas/rutasApi.js")


const port = process.env.PORT || 6000;

const configApi = (app) =>{
    //uso cors para activar todos los origenes
    app.use(cors());//si quisiera que sea solo para nuestro front lo pongo como: 
    // app.use(cors(origin: 'http://localhost:5502'));
    app.use(express.urlencoded({extended: true})); //permite que express entienda forms enviados por post
    app.use(express.json());
    app.use((req, res, next) => { //para manejar los errores en inicio de sesiónnnn
    if (req.query.error) {
        res.locals.error = req.query.error;
    }
    next();
    });


    //sirvo estatico como estatico para poder iniciaer con el index
    app.use(express.static(path.join(__dirname, 'estatico')));
    app.set('view engine', 'ejs'); //seteo que las vistas se trrabajan con ejs
    app.set('views', path.join(__dirname, 'vista')); //le paso el path de las vistas

    app.use('/admin', rutasAdmin); //cargo todas las vistas del admin con /admin
    app.use('/cliente', rutasCliente); //activo las rutas de los clientes con /cliente
    app.use('/api/productos', rutasProductos); //seteo que todas las apis inicien con /api/productos

    return;
} 

const init = () =>{
    const app = express();
    configApi(app);
    app.listen(port, '0.0.0.0',() => {
        console.log(`Listening on port ${port}`)
})
}

init();
