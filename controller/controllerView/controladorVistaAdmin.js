const Producto = require("../../servicios/querys")

exports.renderLog = (req, res) => {
    res.render('login'); // vista login.ejs
};

exports.renderDashboard = (req, res) => {
    res.render('dashboard', {res});
};

exports.renderAlta = (req, res) => {
    res.render('formABMproductos', { modo: 'alta', producto: null });
};

exports.renderCreate = (req, res)=>{
    res.render('createUser');
};
exports.renderFormEditar = async(req, res) => {
    const id = req.params.id;
    try{
        const producto = await Producto.getById(id);
        console.log(producto[0].nombre)
        res.render('formABMproductos', { modo: 'modificar', producto });

    }catch(err){
        throw err;
    }
};

