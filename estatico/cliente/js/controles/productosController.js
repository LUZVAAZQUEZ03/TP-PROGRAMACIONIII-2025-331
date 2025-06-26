import { Producto } from "../modelos/productos.js";
class ControlProductos{
    Modelo;
    VistaProductos;
    paginaActual;
    productosPorPagina;
    constructor(p_modelo,p_vista){
        this.Modelo=p_modelo;
        this.VistaProductos=p_vista;
        this.VistaProductos.ControlProductos = this;
        this.paginaActual = 1;
        this.productosPorPagina = 2; 
        this.init();
    }
    async init() {
        const respuesta = await fetch('http://localhost:3000/api/productos/count')
            .then(r => r.json());

        this.totalProductosActivos = respuesta.totalActivos;
        this.totalPaginas = Math.ceil(this.totalProductosActivos / this.productosPorPagina);

        this.cargaInicial();
        this.registrarBotones();
    }
    async cargaInicial(){
        try {
            const response = await fetch(`http://localhost:3000/api/productos/paginacion?page=${this.paginaActual}&limit=${this.productosPorPagina}`);
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            const data = await response.json();
            const productos = data.map(obj => Producto.createFromObject(obj));
            this.Modelo.productos = productos;
            this.VistaProductos.mostrarProductos(productos);
            this.desactivarBotones(productos);
        } catch (error) {
            console.error('Error en la petición', error);
            alert('Error al cargar los productos.\n\nVuelva a intentarlo en otro momento :(');
        } finally {
            console.log("DESPUES DEL FETCH")
        }
    }
    desactivarBotones(productosMostrados) {
        this.VistaProductos.btnAnterior.style.display = (this.paginaActual === 1) ? 'none' : '';

        this.VistaProductos.btnSiguiente.style.display =
            (this.paginaActual >= this.totalPaginas) ? 'none' : '';
    }
    registrarBotones() {
        this.VistaProductos.btnSiguiente.addEventListener('click', () => {
            this.paginaActual++;
            this.cargaInicial();
        });
        this.VistaProductos.btnAnterior.addEventListener('click', () => {
            if (this.paginaActual > 1) {
                this.paginaActual--;
                this.cargaInicial();
            }
        }); 
    }

}
export {ControlProductos}