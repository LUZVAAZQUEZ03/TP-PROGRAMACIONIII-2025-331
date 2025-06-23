const Producto = require('../../servicios/querys');
const validateProduct = require('../../model/validacionesProducto'); // ajustá la ruta si es necesario
const validateUser = require('../../model/validacionesCuentas'); // ajustá la ruta si es necesario
const { hash } = require('bcrypt');
const bcrypt = require('bcrypt');


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

exports.createProd = async (req, res) => {
    const { nombre,precio,stock, foto: fotoProducto, category: categoria } = req.body;
    
    console.log(nombre,precio,stock,fotoProducto,categoria)
    try {
        await validateProduct.validate(nombre,precio,stock,fotoProducto,categoria);
        const estado = 1;
        const nuevoProducto = { nombre,precio,stock,fotoProducto,categoria, estado };
        
        Producto.create(nuevoProducto, (err, result) => {
            if (err) return res.status(500).json({ error: 'Error al crear producto' });
            res.redirect('/admin/dashboard');
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

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
        if (err) return res.status(500).json({ error: 'Error al desactivar' });
        res.redirect('/admin/dashboard');
        console.log("desactivado")
    });
};

exports.createUser = async (req, res) =>{
    const { user, mail,passA, passB } = req.body;
    console.log( user, mail,passA, passB);
    try{
        await validateUser.validate(user, mail,passA, passB);

        const hash = await validateUser.encriptar(passA);

        const usuario = { usuario: user,correo: mail, passw: hash};
        console.log(usuario)

        Producto.createUser(usuario, (err) => {
            if (err) return res.status(500).json({ error: 'Error al crear usuario' });
            console.log('usuario creado <3')
            res.redirect('/admin/');
        });

    } catch (error){
        throw error;
    };
};

exports.ingresar = (req, res) => {
    const { user, passw1 } = req.body;
    console.log( user, passw1)
    Producto.getUser(user, async (err, respuesta) => {        
        if (err) {
            return res.redirect('/admin/?error=server');
        }
        
        if (respuesta.length === 0) {
            return res.redirect('/admin/?error=user_not_found');
        }
        
        const userDB = respuesta[0];
        console.log( userDB)
        
        try {
            const match = await bcrypt.compare(passw1, userDB.passw); 
            console.log(match)

            if (match) {
                // Contraseña válida
                res.redirect('/admin/dashboard');
            } else {
                // Contraseña incorrecta
                return res.redirect('/admin/?error=incorrect_password')
            }
        } catch (error) {
            return res.redirect('/admin/?error=password_check_failed');
        }
    });
};