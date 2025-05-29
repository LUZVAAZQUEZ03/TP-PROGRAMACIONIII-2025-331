exports.renderLog = (req, res) => {
    res.render('login'); // vista login.ejs
};

exports.renderDashboard = (req, res) => {
    res.render('dashboard');
};

exports.renderAlta = (req, res) => {
    res.render('formABMproductos');
};

exports.renderCreate = (req, res)=>{
    res.render('createUser');
};