const Producto = require('../../servicios/querys');
const validateProduct = require('../../model/validacionesProducto'); 
const validateUser = require('../../model/validacionesCuentas'); 
const { hash } = require('bcrypt');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getPaginacion = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Obtiene el número de página de la consulta, o usa 1 por defecto
    const limit = 1;

    try {
        const data = await Producto.getPaginacion(page, limit); 
        res.json(data); // Devuelve los productos paginados como JSON
        console.log("PROBANDO "+ data);
    } catch (error) {
        console.error('ERROR EN LA PAGINACIÓN:', error); 
        res.status(500).send('Error al obtener productos paginados');
    }
};

exports.countActivos = async (req, res) => {
    try {
        const totalActivos = await Producto.countActivos(); 
        res.json({ totalActivos }); // Devuelve el total de productos activos como JSON
        console.log("Total de productos activos: " + totalActivos);
    } catch (error) {
        console.error('ERROR AL CONTAR PRODUCTOS ACTIVOS:', error); 
        res.status(500).send('Error al contar productos activos');
    }
};

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
        const stockActual = await Producto.getStock(id)
        if (stockActual[0].stock > 0 ){
            await Producto.activate(id);
        
            res.redirect('/admin/dashboard');
            console.log("activado");
        }else{
            res.redirect('/admin/dashboard?error=sinStock');
        }
    }catch(error){
        throw (error)
    }
};

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
    console.log(req.body)
    console.log("iniciando crear")
    
    console.log( user, mail,passA, passB);
    try{ 
        
        console.log("TRY")
        await validateUser.validate(user, mail, passA, passB);

        const hash = await validateUser.encriptar(passA);

        const usuario = { usuario: user, correo: mail, passw: hash};
        console.log(usuario, hash)
        console.log("usuario", usuario)

        await Producto.createUser(usuario)
        //if (err) res.redirect('/admin/createUser/?error=server');;
        console.log('usuario creado <3')
        res.redirect('/admin/');


    } catch (error){
        res.redirect('/admin/createUser/?error=server');
    };
};

exports.ingresar = async(req, res) => {
    const { mail, passw1 } = req.body;
    console.log( mail, passw1)
    try {
        const userDB = await Producto.getCorreo(mail);
        console.log('pass db: ', userDB[0].passw)

        const match = await bcrypt.compare(passw1, userDB[0].passw); 
        console.log('matchhh ->' + match)
        
        const token = jwt.sign(
            {id: userDB[0].id, user: userDB[0].correo},
            process.env.TOKEN_JWT,
            { expiresIn: '15m' }
        )

        if (match) {
            // Contraseña válida
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/admin/dashboard');
        } else {
            // Contraseña incorrecta
            console.log('Contraseña incorrecta');
            return res.redirect('/admin/?error=incorrect_password')
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.redirect('/admin/?error=password_check_failed');
    }
};

exports.logOut = async(req, res)=>{
    console.log('sesión finalizada ')
    res.clearCookie('token');
    res.redirect('/admin/');
};