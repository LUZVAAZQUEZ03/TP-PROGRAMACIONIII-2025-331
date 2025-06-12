const db = require('./db_conect');

module.exports = {
    obtenerTodos(cb) {
        db.query('SELECT * FROM productos', cb);
    },
    obtenerActivos(cb){
        db.query('SELECT * FROM productos WHERE estado = 1',cb)
    },

    crear(producto, cb) {
        db.query('INSERT INTO productos SET ?', producto, cb);
    },


    actualizar(id, producto, cb) {
        db.query('UPDATE productos SET ? WHERE id = ?', [producto, id], cb);
    },

    bajaLogica(id, cb) {
        db.query('UPDATE productos SET estado = 0 WHERE id = ?', [id], cb);
    },

    activar(id, cb) {
        db.query('UPDATE productos SET estado = 1 WHERE id = ?', [id], cb);
    }
    };