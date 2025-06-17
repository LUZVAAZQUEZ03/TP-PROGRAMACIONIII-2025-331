const db = require('./db_conect');

module.exports = {
    getAll(cb) {
        db.query('SELECT * FROM productos', cb);
    },
    getActive(cb){
        db.query('SELECT * FROM productos WHERE estado = 1',cb)
    },

    create(producto, cb) {
        db.query('INSERT INTO productos SET ?', producto, cb);
    },

    getById(id, cb){
        db.query('SELECT * FROM productos WHERE id = ?', [id], cb);
    },

    updateById(id, producto, cb) {
        db.query('UPDATE productos SET ? WHERE id = ?', [producto, id], cb);
    },

    drop(id, cb) {
        db.query('UPDATE productos SET estado = 0 WHERE id = ?', [id], cb);
    },

    activate(id, cb) {
        db.query('UPDATE productos SET estado = 1 WHERE id = ?', [id], cb);
    }
    };