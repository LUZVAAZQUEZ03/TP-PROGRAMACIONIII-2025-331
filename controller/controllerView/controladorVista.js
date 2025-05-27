//seteto path de admin
app.set("views", path.join(__dirname + "/vista"))

//log del lado del admin 
app.get("/logAdmin", (request,response)=>{
    response.render("logIn.ejs")
})

//productos del lado del admin
app.get("/agregarproductos",(request, response)=>{
    response.render("products.ejs")
})
