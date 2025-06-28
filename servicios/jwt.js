require('dotenv').config();
const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        console.log('no hay tokeeeeeeeen');
        return res.redirect('/admin/?error=token_missing');
    }

    try {
        const user = jwt.verify(token, process.env.TOKEN_JWT || 'ClaveSuperSecretas123');
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie('token'); 

        if (err.name === 'TokenExpiredError') {
            console.log('Token vencido');
            return res.redirect('/admin/?error=token_expired');
        }

        console.error('Token inválido:');
        return res.redirect('/admin/?error=invalid_token');
    }
};

module.exports = verificarToken;
