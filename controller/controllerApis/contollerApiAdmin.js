const Producto = require('../../servicios/querys');
const validateProduct = require('../../model/validacionesProducto'); // ajustá la ruta si es necesario


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

exports.create = async (req, res) => {
    const productName = req.body.nombre;
    const precio = req.body.precio
    const stock = req.body.stock
    const image = req.body.foto
    const category = req.body.category
    console.log(productName,precio,stock,image,category)
    
    try {
        await validateProduct.validate(productName,precio,stock,image,category);
        
        const nuevoProducto = { productName,precio,stock,image,category };
        
        Producto.create(nuevoProducto, (err, result) => {
            if (err) return res.status(500).json({ error: 'Error al crear producto' });
            res.json({ mensaje: 'Producto creado', id: result.insertId });
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


/*
exports.update = (req, res) => {
    const id = req.params.id;
    const datos = req.body;
    
    res.render('formABMproductos', { modo: 'modificar', datos });
    res.json({ mensaje: 'Producto actualizado' });
    
    };
    */
    exports.update = async (req, res) => {
        const id = req.params.id;

        const { nombre,precio,stock, foto: fotoProducto, category: categoria } = req.body;
        console.log(nombre,precio,stock,fotoProducto,categoria)
        
        try {
            await validateProduct.validate(nombre,precio,stock,fotoProducto,categoria );
            
            const productoModificado = { nombre,precio,stock,fotoProducto,categoria  };
            
            Producto.updateById(id, productoModificado, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al actualizar producto' });
                }
                res.redirect('/admin/dashboard');
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
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

    Producto.drop(id, (err) => {
        if (err) return res.status(500).json({ error: 'Error al activar' });
        res.redirect('/admin/dashboard');
        console.log("desactivado")
    });
};

exports.createUser = (req, res) =>{
    Producto.createUser(id, (err) => {
        if (err) return res.status(500).json({ error: 'Error al crear usuario' });
        res.redirect('/admin/');
    });
};
exports.getUser = (req, res) =>{
    const user = req.params.user;
    const pass = req.params.pass;

    Producto.getUser(user, pass, (err) => {
        if (err) return res.status(500).json({ error: 'Error al encntrar usuario' });
        res.redirect('/admin/dashboard');
    });
};
