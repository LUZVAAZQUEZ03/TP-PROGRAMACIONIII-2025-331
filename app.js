const express = require('express')
const app = express()
const path = require('path')
const rutasAdmin = require("./rutas/rutasAdmin.js")
const rutasCliente = require("./rutas/rutasCliente.js");//exporto las rutas de los htmsls de cliente
const port = 3000


//sirvo estatico como estatico para poder iniciaer con el index
app.use(express.static(path.join(__dirname, 'estatico')));

app.set('view engine', 'ejs'); //seteo que las vistas se trrabajan con ejs
app.set('views', path.join(__dirname, 'vista')); //le paso el path de las vistas

app.use('/', rutasAdmin); //cargo todas las vistas del admin
app.use('/cliente', rutasCliente); //activo las turas de los clientes con /cliente


//el index del programa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + 'estatico'))
})


app.listen(port, '0.0.0.0',() => {
    console.log(`Listening on port ${port}`)
})

