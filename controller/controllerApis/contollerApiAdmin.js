const Producto = require('../../servicios/querys');

exports.getAll = (req, res) => {
    Producto.getAll((err, data) => {
        if (err){
        return res.status(500).json({ error: 'Error al obtener productos' });
        }    
        res.render('dashboard', {data})
        console.log(data)
    });
};
exports.getActive = (req, res) => {
    Producto.getActive((err, data) => {
        if (err){
        return res.status(500).json({ error: 'Error al obtener productos' });
        }    
        res.json(data);
        console.log(data)
    });
};
exports.create = (req, res) => {
    const nuevoProducto = req.body;

    Producto.create(nuevoProducto, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al crear producto' });
        res.json({ mensaje: 'Producto creado', id: result.insertId });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const datos = req.body;

    res.render('formABMproductos', { modo: 'modificar', datos });
    res.json({ mensaje: 'Producto actualizado' });

};

exports.activar = (req, res) => {
    const id = req.params.id;

    Producto.activate(id, (err) => {
        if (err) return res.status(500).send('Error al activar producto');
        res.redirect('/admin/dashboard');
    });
}

exports.desactivar = (req, res) => {
    const id = req.params.id;

    Producto.activate(id, (err) => {
        if (err) return res.status(500).json({ error: 'Error al activar' });
        res.redirect('/admin/dashboard');
        console.log("desactivado")
    });
};

