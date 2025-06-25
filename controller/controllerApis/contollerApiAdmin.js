const Producto = require('../../servicios/querys');
const validateProduct = require('../../model/validacionesProducto'); 
const validateUser = require('../../model/validacionesCuentas'); 
const { hash } = require('bcrypt');
const bcrypt = require('bcrypt');


exports.getAll = async(req, res) => {
    try {
        const data = await Producto.getAll(); 
        res.render('dashboard', { data }); 
    } catch (error) {
        res.status(500).send('Error al obtener productos controller');
    }

};

exports.getActive = async (req, res) => {
    try {
        const data = await Producto.getAll(); 
        res.json( data ); 
        console.log(data)
    } catch (error) {
        res.status(500).send('Error al obtener productos');
    }
};

exports.createProd = async (req, res) => {
    
    const { nombre, precio, stock,category: categoria } = req.body;
    
    let fotoProducto;
    console.log('req.file; ', req.file)
    if (req.file) {
        fotoProducto = '/productos/' + req.file.filename;
    }else {
        console.log('no hay imagen:');   
    }
    
    console.log(nombre, precio, stock, fotoProducto, categoria)
    try {
        await validateProduct.validate(nombre, precio,stock, fotoProducto, categoria);
        const estado = 1;
        const nuevoProducto = { nombre, precio, stock, fotoProducto, categoria, estado };
        
        await Producto.create(nuevoProducto);

        res.redirect('/admin/dashboard');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    
    let fotoProducto = req.body.fotoActual;

    if (req.file) {
        console.log('req.file; ', req.file)
        console.log('\nNueva imagen:');
        fotoProducto = '/productos/' + req.file.filename;
    } else {
        console.log('Se mantiene imagen:');   
    }
    const { nombre,precio,stock,category: categoria } = req.body;
    
    console.log(nombre,precio,stock,fotoProducto,categoria)
    try {
    
        await validateProduct.validate(nombre,precio,stock,fotoProducto,categoria );
        
        const productoModificado = { nombre,precio,stock,fotoProducto,categoria };
        
        await Producto.updateById(id, productoModificado);

        res.redirect('/admin/dashboard');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.activar = async (req, res) => {
    const id = req.params.id;

    try{
        await Producto.activate(id);
    
        res.redirect('/admin/dashboard');
        console.log("activado");
    }catch(error){
        throw (error)
    }
}

exports.desactivar = async(req, res) => {
    const id = req.params.id;
    
    try{
        await Producto.drop(id)
        res.redirect('/admin/dashboard')
        console.log("desactivado");
    }catch (error){
        throw error;
    }
};

exports.createUser = async (req, res) =>{
    const { user, mail,passA, passB } = req.body;
    console.log( user, mail,passA, passB);
    try{
        await validateUser.validate(user, mail,passA, passB);

        const hash = await validateUser.encriptar(passA);

        const usuario = { usuario: user,correo: mail, passw: hash};
        console.log(usuario)

        await Producto.createUser(usuario)
        //if (err) res.redirect('/admin/createUser/?error=server');;
        console.log('usuario creado <3')
        res.redirect('/admin/');


    } catch (error){
        res.redirect('/admin/createUser/?error=server');
    };
};

exports.ingresar = async(req, res) => {
    const { user, passw1 } = req.body;
    console.log( user, passw1)
    try {
        const userDB = await Producto.getUser(user);
        console.log('useeeerdb ', userDB[0].passw)

        const match = await bcrypt.compare(passw1, userDB[0].passw); 
        console.log('matchhh' + match)

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
};