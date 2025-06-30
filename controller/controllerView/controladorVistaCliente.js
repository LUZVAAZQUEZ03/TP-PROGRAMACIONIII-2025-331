const path = require('path');

exports.renderProductos = (req, res) => {
    res.sendFile(path.join(__dirname, '../../estatico/cliente/productos.html')); //con sendFile necesito la ruta absoluta
};//sendFile es para enviar archivos HTML estaticos
exports.renderBienvenidoCliente = (req,res) =>{
    res.sendFile(path.join(__dirname, '../../estatico/cliente/bienvenido.html'));
}
exports.renderCarritoCliente = (req,res) =>{
    res.sendFile(path.join(__dirname, '../../estatico/cliente/carrito.html'));
}
exports.renderTicket = (req,res) =>{
    res.sendFile(path.join(__dirname, '../../estatico/cliente/ticket.html' ));
}
