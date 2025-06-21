
class ControlCarrito{
    Modelo;
    VistaCarrito;
    productosCarrito = [];
    constructor(p_modelo,p_vista){
        this.Modelo=p_modelo;
        this.VistaCarrito=p_vista;      
        this.agregarCarrito();  
        this.registrarBotonesGenerles();
    }
    registrarBotonesQuitar() {
        const botones = document.querySelectorAll(".removerBtn");
        botones.forEach((boton) => {
            const index = parseInt(boton.getAttribute("data-idx"));
            boton.addEventListener("click", () => {
                this.sacarDelCarrito(index,boton);
                this.VistaCarrito.mostrarProductosCarrito(this.obtenerProductosCarrito());
            });
        });
    }
    registrarBotonesGenerles() {
        this.VistaCarrito.botonContinuar.addEventListener("click", () => {
            window.location.href = "productos.html";
        });
        this.VistaCarrito.botonFin.addEventListener("click", () => {
            window.location.href = "ticket.html";
        }); 
    }
    obtenerProductosCarrito() {
        const productosCarrito = [];
        for (let i = 0; i < localStorage.length; i++) {
            const clave = localStorage.key(i);
            if (clave.startsWith("producto")) {
                const item = localStorage.getItem(clave);
                try {
                    const producto = JSON.parse(item);
                    productosCarrito.push(producto);
                } catch (e) {
                    console.error(`Error al parsear el producto ${clave}:`, e);
                }
            }
        }
        return productosCarrito;
    }
    sacarDelCarrito(index,boton) {
        const producto = this.productosCarrito[index];
        localStorage.removeItem(`producto${producto.id}`);
        this.productosCarrito.splice(index, 1); // Elimina el producto de la lista tmb
        const itemElement = boton.closest(".carrito-item");//elimina solo ese item, asi no recraga todo el dom nuevamente.
        if (itemElement) itemElement.remove();
        alert(`Producto "${producto.nombre}" eliminado del carrito.`);
        this.VistaCarrito.ac
        this.VistaCarrito.mostrarProductosCarrito(this.obtenerProductosCarrito());
    }

    agregarCarrito(){
        this.productosCarrito = this.obtenerProductosCarrito();
        if (this.productosCarrito.length === 0) {
            alert("El carrito está vacío.");
            return false;
        }   
        this.VistaCarrito.mostrarProductosCarrito(this.productosCarrito);
        this.registrarBotonesQuitar();        
    }
}
export { ControlCarrito };