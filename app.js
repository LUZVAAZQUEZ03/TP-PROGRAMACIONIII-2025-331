const express = require('express')
const app = express()
const cors= require("cors")
const path = require("path")
const { request } = require('http')
const port = 3000



//sirvo estatico como estatico para poder iniciaer con el index
app.use("/estatico", express.static(__dirname + "/estatico"))


//el index del programa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/estatico/index.html"))
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})