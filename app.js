const express = require('express')
const cors= require("cors")
const app = express()
const path = require("path")
const { request } = require('http')
const port = 3000


app.use("/vista", express.static(__dirname + "/vista"));
//estamos sirviendo vista como estatico para poder usarlo desde "estatico/admin" y "estatico/cliente"
app.use("/estatico", express.static(__dirname + "/estatico"))
//sirvo estatico como estatico para poder iniciaer con el index
app.set("views", path.join(__dirname + "/estatico/administrador"))
//seteto path 


//el index del programa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/estatico/index.html"))
})

//log del lado del admin 
app.get("/log", (request,response)=>{
    response.render("logIn.ejs")
})

//productos del lado del admin
app.get("/agregarproductos",(request, response)=>{
    response.render("products.ejs")
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})