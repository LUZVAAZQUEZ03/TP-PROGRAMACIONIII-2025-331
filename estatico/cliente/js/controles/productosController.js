import { Producto } from "../modelos/productos.js";
class ControlProductos{
    Modelo;
    VistaProductos;
    constructor(p_modelo,p_vista){
        this.Modelo=p_modelo;
        this.VistaProductos=p_vista;
        this.VistaProductos.ControlProductos = this;
        this.cargaInicial();
    }
    async cargaInicial(){
        try {
            const response = await fetch('http://localhost:3000/api/productos/activos');
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            console.log("RESPONSSEE"+response);
            const data = await response.json();
            console.log(data);
            const productos = data.map(obj => Producto.createFromObject(obj));
            console.log(productos);
            this.VistaProductos.mostrarProductos(productos);
        } catch (error) {
            console.error('Error en la petición', error);
            alert('Error al cargar los productos.\n\nVuelva a intentarlo en otro momento :(');
        } finally {
            console.log("DESPUES DEL FETCH")
        }
    }

}
export {ControlProductos}