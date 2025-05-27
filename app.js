const express = require('express')
const app = express()
const cors= require("cors")
const path = require("path")
const { request } = require('http')
const port = 3000


//estamos sirviendo vista como estatico para poder usarlo desde "estatico/admin" y "estatico/cliente"
app.use("/vista", express.static(__dirname + "/vista"));

//sirvo estatico como estatico para poder iniciaer con el index
app.use("/estatico", express.static(__dirname + "/estatico"))

//seteto path de admin
app.set("views", path.join(__dirname + "/estatico/administrador"))


//el index del programa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/estatico/index.html"))
})

//log del lado del admin 
app.get("/logAdmin", (request,response)=>{
    response.render("logIn.ejs")
})

//productos del lado del admin
app.get("/agregarproductos",(request, response)=>{
    response.render("products.ejs")
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})