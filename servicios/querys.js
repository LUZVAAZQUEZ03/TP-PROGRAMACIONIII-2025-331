const conexion = require('./db_conect');
const {executeQuery }= require('./db_conect');

module.exports = {
    async getPaginacion(page, limit){//recibo la pagina que quiero y el limite de productos por pagina
        const offset = (Number(page) - 1) * Number(limit);
        try { 
            const queryPerfum = `SELECT * FROM productos where CATEGORIA = 'Perfume' AND ESTADO = 1 LIMIT ${limit} OFFSET ${offset}`;
            const querySkincare = `SELECT * FROM productos where CATEGORIA = 'Skincare' AND ESTADO = 1 LIMIT ${limit} OFFSET ${offset}`;
            console.log("PAGINACION:", queryPerfum, querySkincare);
            const perfume = await executeQuery(queryPerfum, [1, offset]);
            const skincare = await executeQuery(querySkincare, [1, offset]);
            
            const productosCombinados = [...perfume, ...skincare];
            return productosCombinados;
        } catch (error) {
            throw error;
        }
    },
    async countActivos() {
        const query = 'SELECT COUNT(*) AS total FROM productos WHERE estado = 1';
        const result = await executeQuery(query);
        return result[0].total;
    },
    async getAll() {
        const query = `SELECT * FROM productos`;

        try {
            const result = await executeQuery(query);
            return result;
        } catch (error) {
            throw error;
        }
    },
    
    async getActive(){
        const query = 'SELECT * FROM productos WHERE estado = 1';
        try {
            const result = await executeQuery(query);
            return result;
        } catch (error) {
            throw error;
        }
    },
    
    async create(producto) {
        const query = 'INSERT INTO productos SET nombre = ?, precio = ?, stock = ?, fotoProducto = ?, categoria = ?, estado = ? ';
        const params = [producto.nombre, producto.precio, producto.stock, producto.fotoProducto, producto.categoria, producto.estado]
        try{
            const result = await executeQuery(query, params);
            return result;
        }catch(error){
            throw (error)
        }
    },
    
    
    async getById(id){
        const query = 'SELECT * FROM productos WHERE id = ?';
        try{
            const result = await executeQuery(query,[id]);
            return result;
        }catch(error){
            throw (error)
        }
    },
    
    async updateById(id, producto) {
        // console.log("recibo en la qry -> " , producto.nombre)
        const query = 'UPDATE productos SET nombre = ?, precio = ?, stock = ?, fotoProducto = ?, categoria = ? WHERE id = ?' ;
        const params = [producto.nombre, producto.precio, producto.stock, producto.fotoProducto, producto.categoria,  id]
        console.log('mis params son ->' , params);
        try{
            const result = await executeQuery(query, params);
            return result;
        }catch(error){
            throw (error)
        }
    
    },
    
    async drop(id) {
        const query = 'UPDATE productos SET estado = 0 WHERE id = ?';
        try{
            const result = await executeQuery(query,[id]);
            return result;
        }catch(error){
            throw (error)
        }
    },
    
    async activate(id) {
        const query = 'UPDATE productos SET estado = 1 WHERE id = ?';
        try{
            const result = await executeQuery(query,[id]);
            return result;
        }catch(error){
            throw (error)
        }
    },
    
    async getStatus(id ){
        const query = 'SELECT estado FROM productos WHERE id = ?';
        try{
            const result = await executeQuery(query,[id]);
            return result;
        }catch(error){
            throw (error)
        }
    },
    
    async createUser(user){
        console.log(user)
        const query = 'INSERT INTO usuario  SET usuario = ?, correo = ?, passw = ?';
        const params = [user.usuario, user.correo, user.passw];
        try{
            const result = await executeQuery(query, params);
            console.log(result)
            return result;
        }catch(error){
            throw (error)
        }
    },
    
    async getUser(user){
        const query = 'SELECT * FROM usuario WHERE usuario = ?';
        console.log('usuarioooooo' + user)
        const params = [user];
        try{
            const result = await executeQuery(query, params);
            return result;
        }catch(error){
            throw (error)
        }
    }
};