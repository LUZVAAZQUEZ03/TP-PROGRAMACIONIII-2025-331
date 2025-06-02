const Producto = require('../../servicios/modeloConect.js');

exports.getAll = (req, res) => {
    Producto.obtenerTodos((err, data) => {
        if (err){
        return res.status(500).json({ error: 'Error al obtener productos' });
        }    
        res.json(data);
        console.log(data)
    });
};
exports.create = (req, res) => {
    const nuevoProducto = req.body;
    nuevoProducto.activo = 1;

    Producto.crear(nuevoProducto, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al crear producto' });
        res.json({ mensaje: 'Producto creado', id: result.insertId });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const datos = req.body;

    Producto.actualizar(id, datos, (err) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar' });
        res.json({ mensaje: 'Producto actualizado' });
    });
};

exports.activar = (req, res) => {
    const id = req.params.id;

    Producto.activar(id, (err) => {
        if (err) return res.status(500).json({ error: 'Error al activar' });
        res.json({ mensaje: 'Producto activado' });
    });
};

