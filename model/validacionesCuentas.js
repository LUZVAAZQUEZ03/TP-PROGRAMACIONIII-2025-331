const user = require('./user')
const bcrypt = require('bcrypt');

const validateAdmin = {
    // Validar username 
    async validateUsername(userName) {
        if (typeof userName !== 'string' || userName.length < 2 || userName.length > 12) {
            throw new Error('El nombre de usuario debe tener entre 3 y 12 caracteres.');
        }
    },

    // Validar formato del mail
    async validateMail(mail) {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regexEmail.test(mail)) {
            throw new Error('El formato de mail no es válido.');
        }
    },

    // Validar contraseñas
    async validatePass(passA, passB) {
        if (passA !== passB) {
            throw new Error("Las contraseñas deben coincidir.");
        }
        if (typeof passA !== 'string' || passA.length < 3 || passA.length > 18) {
            throw new Error("La contraseña debe tener entre 6 y 18 caracteres.");
        }
    },

    // Validar admin
    async validate(userName, mail, passA,passB){
        await this.validateUsername(userName);
        await this.validateMail(mail);
        await this.validatePass(passA,passB);
    },

    async encriptar(pass) {
    try {
        const hash = await bcrypt.hash(pass, 10);
        return hash;
    } catch (err) {
        throw err;
        };
    },

    async desencriptar(pass, hash){
        const clave = await bcrypt.compare(pass, hash);
        return clave
    }

};   

module.exports = validateAdmin;
