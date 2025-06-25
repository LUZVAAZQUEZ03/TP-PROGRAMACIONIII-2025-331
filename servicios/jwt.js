require('dotenv').config();

const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        console.log('nooooooooooooooooo');
        return res.redirect('/admin/');
    }

    try {
        jwt.verify(token, process.env.TOKEN_JWT || 'ClaveSuperSecretas123', (err, user) =>{
            if(err){
                console.log('token invalido/vencido')
                return res.redirect('/admin/');
            }
            req.user = user;
        });
        
        
        next();
    } catch (err) {
        console.error('Error al verificar token');
        return res.redirect('/admin/');
    }
}

module.exports = verificarToken;
