const Producto = require('../../servicios/modeloConect.js');

exports.getAll = (req, res) => {
    Producto.obtenerTodos((err, data) => {
        if (err){
        return res.status(500).json({ error: 'Error al obtener productos' });
        }    
        res.json(data);
    });
};

