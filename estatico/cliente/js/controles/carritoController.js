
class ControlCarrito{
    Modelo;
    VistaCarrito;
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
            });
        });
    }
    registrarBotonesGenerles() {
        this.VistaCarrito.botonContinuar.addEventListener("click", () => {
            window.location.href = "/productos";
        });
        this.VistaCarrito.botonFin.addEventListener("click", () => {
            this.VistaCarrito.mostrarModalConfirmacion();
            this.VistaCarrito.Modal.botonCerrar.addEventListener("click", () => {
                this.VistaCarrito.ocultarModalConfirmacion();
            });
            this.VistaCarrito.Modal.botonConfirmar.addEventListener("click", async ()=>{
                const productos = JSON.parse(localStorage.getItem("productosTicket"))  || [];
                if (!productos.length) {
                    alert("El carrito está vacIo. No se puede realizar la compra.");
                    return;
                }
                const cliente = localStorage.getItem("nombreUsuario");
                const total = productos.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
                if ( total === 0 || isNaN(total)) {
                    alert("El carrito está vacío o contiene datos invalidos. No se puede realizar la compra.");
                    return;
                }

                try {
                    const res = await fetch("http://localhost:3000/api/ventas/crear", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            cliente,
                            productos,
                            total
                        })
                    });

                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error);

                    alert("¡Compra realizada con exito!");
                    window.location.href = "/ticket";
                } catch (err) {
                    alert("Error al realizar la compra: " + err.message);
                }
                this.VistaCarrito.ocultarModalConfirmacion();
            })
        }); 
        this.VistaCarrito.botonVaciarCarrito.addEventListener("click", () => {
            this.VistaCarrito.mostrarModalVaciar();
            });

            this.VistaCarrito.ModalVaciar.botonCancelar.addEventListener("click", () => {
            this.VistaCarrito.ocultarModalVaciar();
            });

            this.VistaCarrito.ModalVaciar.botonConfirmarV.addEventListener("click", () => {
            Object.keys(localStorage).forEach((clave) => {
                if (clave.startsWith("producto")) {
                localStorage.removeItem(clave);
                }
            });
            localStorage.removeItem("productosTicket");

            this.VistaCarrito.resetearVista();
            this.VistaCarrito.mostrarCarritoVacio();
            this.VistaCarrito.ocultarModalVaciar();
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
        const productosCarrito = this.obtenerProductosCarrito();
        const producto = productosCarrito[index];
        localStorage.removeItem(`producto${producto.id}`);
        productosCarrito.splice(index, 1); // Elimina el producto de la lista tmb
        const itemElement = boton.closest(".carrito-item");//elimina solo ese item, asi no recraga todo el dom nuevamente.
        if (itemElement) itemElement.remove();
        alert(`Producto "${producto.nombre}" eliminado del carrito.`);
        this.VistaCarrito.resetearVista();
        this.VistaCarrito.mostrarProductosCarrito(this.obtenerProductosCarrito());
        this.registrarBotonesQuitar(); 
    }

    agregarCarrito(){
        const productosCarrito = this.obtenerProductosCarrito();
        if (productosCarrito.length === 0) {
            alert("El carrito está vacío.");
            return false;
        }   
        this.VistaCarrito.mostrarProductosCarrito(productosCarrito);
        this.registrarBotonesQuitar();        
    }
}
export { ControlCarrito };