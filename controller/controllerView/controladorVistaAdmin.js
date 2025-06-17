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
exports.renderFormEditar = (req, res) => {
    const id = req.params.id;
    Producto.getById(id,(err, resultado)=>{
        if (err) return res.status(500).send('Error al obtener producto');
        const producto = resultado[0];
        res.render('formABMproductos', { modo: 'modificar', producto });
    })
};

