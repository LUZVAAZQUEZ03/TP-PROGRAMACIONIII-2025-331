const Producto = require('../../servicios/querys');

exports.getAll = (req, res) => {
    Producto.obtenerTodos((err, data) => {
        if (err){
        return res.status(500).json({ error: 'Error al obtener productos' });
        }    
        res.render('dashboard', {data})
        console.log(data)
    });
};
exports.getActivos = (req, res) => {
    Producto.obtenerActivos((err, data) => {
        if (err){
        return res.status(500).json({ error: 'Error al obtener productos' });
        }    
        res.json(data);
        console.log(data)
    });
};
exports.create = (req, res) => {
    const nuevoProducto = req.body;

    Producto.crear(nuevoProducto, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al crear producto' });
        res.json({ mensaje: 'Producto creado', id: result.insertId });
    });
};

exports.actualizar = (req, res) => {
    const id = req.params.id;
    const datos = req.body;

    res.render('formABMproductos', { modo: 'modificar', datos });
    res.json({ mensaje: 'Producto actualizado' });

};

exports.activar = (req, res) => {
    const id = req.params.id;

    Producto.activar(id, (err) => {
        if (err) return res.status(500).json({ error: 'Error al activar' });
        res.json({ mensaje: 'Producto activado' });
    });
};
exports.desactivar = (req, res) => {
    const id = req.params.id;

    Producto.bajaLogica(id, (err) => {
        if (err) return res.status(500).json({ error: 'Error al activar' });
        res.json({ mensaje: 'Producto desactivado' });
    });
};

