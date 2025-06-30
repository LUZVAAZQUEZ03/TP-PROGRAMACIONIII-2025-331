class VistaCarrito {
    Modal;
    constructor() {
        this.contenedorItems = this.$("carrito-container");
        this.botonContinuar = this.$("continuar-btn");
        this.botonFin = this.$("finalizar-btn");
        this.botonesSacar = this.$all(".removerBtn");
        this.contenedorSubtotal = this.$all(".subtotal");
        this.valorSubtotal = this.$("valorSubtotal");
        this.valorTotal = this.$("valorTotal");
        this.botonVaciarCarrito = this.$("vaciar-carrito-btn");
        this.productosAGuardar = [];
        this.Modal ={
            modal: this.$("modalConfirmacion"),
            botonCerrar: this.$("btnCancelarCompra"),
            botonConfirmar: this.$("btnConfirmarCompra")
        }
        this.ModalVaciar = {
            modal: this.$("modalVaciarCarrito"),
            botonConfirmarV: this.$("btnConfirmarVaciado"),
            botonCancelar: this.$("btnCancelarVaciado"),
            };
    }

    $(id) {
        return document.getElementById(id);
    }
    $all(selector) {
        return document.querySelectorAll(selector);
    }
    mostrarModalConfirmacion() {
        this.Modal.modal.style.display = "flex";
    }
    ocultarModalConfirmacion() {
        this.Modal.modal.style.display = "none";
    }
    mostrarModalVaciar() {
        this.ModalVaciar.modal.style.display = "flex";
    }
    ocultarModalVaciar() {
        this.ModalVaciar.modal.style.display = "none";
    }
    mostrarProductosCarrito(productosCarrito) {
        this.productosAGuardar = [];
        this.resetearVista();
        if (productosCarrito.length === 0) {
            this.mostrarCarritoVacio();
            return;
        }
        productosCarrito.forEach((producto, index) => {
            const item = this.crearItemCarrito(producto, index);
            if (item != undefined){
                this.contenedorItems.appendChild(item);
            }

        });

        this.actualizarLocalStorage();
        this.actualizarSubtotal();
    }

    resetearVista() {
        this.contenedorItems.innerHTML = "";
    }

    mostrarCarritoVacio() {
        this.contenedorItems.innerHTML = "<p>El carrito está vacío.</p>";
        if (this.valorSubtotal) this.valorSubtotal.textContent = "0.00";
        if (this.valorTotal) this.valorTotal.textContent = "$0.00";
    }

    crearItemCarrito(producto, index) {
        if (producto.nombre === undefined && producto.precio === undefined && producto.fotoProducto === undefined) {
            console.error("Producto incompleto:", producto);
            return undefined;} // Retorna undefined si el producto no tiene los campos necesarios}
        const item = document.createElement("div");
        item.className = "carrito-item";
        console.log("Producto en crearItemCarrito:", producto);
        item.innerHTML = `
            <img src="${producto.fotoProducto}" alt="${producto.nombre}" class="item__imagen" />
            <div class="item__detalle">
                <p class="item__nombre">${producto.nombre}</p>
                <p class="item__precio">$${producto.precio}</p>
            </div>
            <div class="product-quantity">
                <input class="input-text2" type="number" min="1" required value="1" step="1" max="${producto.stock}" data-index="${index}">
            </div>
            <p class="product-total" id="total-${index}">$${producto.precio}</p>
            <button class="boton removerBtn boton-rojo" data-idx="${index}">Quitar del carrito</button>
        `;

        const inputCantidad = item.querySelector('input[type="number"]');
        const totalProductElem = item.querySelector(`#total-${index}`);
        if (!inputCantidad || !totalProductElem) {
            localStorage.removeItem(`producto${producto.id}`);
        }
        const productoConCantidad = {
            ...producto,
            cantidad: 1,
            totalProduct: producto.precio
        };
        this.productosAGuardar.push(productoConCantidad);

        inputCantidad.addEventListener("input", (e) =>
            this.manejarCambioCantidad(e, producto, index, totalProductElem)
        );
        inputCantidad.addEventListener("blur", (e) => {
            let cantidad = parseInt(e.target.value);
            if (isNaN(cantidad) || cantidad < 1) {
                cantidad = 1;
                e.target.value = cantidad;
                this.manejarCambioCantidad(e, producto, index, totalProductElem);
            }
        });
        inputCantidad.addEventListener("keypress", (e) => {//no deja poner punto y coma
            if (e.key === "." || e.key === ",") {
                e.preventDefault();
            }
        });
        return item;
    }

    manejarCambioCantidad(e, producto, index, totalProductElem) {
        let cantidad = parseInt(e.target.value);
        
        if (cantidad > producto.stock) {
            alert(`Solo hay ${producto.stock} unidades disponibles.`);
            cantidad = producto.stock;
            e.target.value = producto.stock;
        }

        const total = producto.precio * cantidad;
        totalProductElem.textContent = `$${total.toFixed(2)}`;

        this.productosAGuardar[index].cantidad = cantidad;
        this.productosAGuardar[index].totalProduct = total;

        this.actualizarSubtotal();
        this.actualizarLocalStorage();
    }

    actualizarLocalStorage() {
        localStorage.setItem("productosTicket", JSON.stringify(this.productosAGuardar));
    }

    actualizarSubtotal() {
        const totales = document.querySelectorAll(".product-total");
        let subtotal = 0;
        totales.forEach((el) => {
            const valor = parseFloat(el.textContent.replace("$", ""));
            if (!isNaN(valor)) subtotal += valor;
        });

        if (this.valorSubtotal) {
            this.valorSubtotal.textContent = subtotal.toFixed(2);
        }
        if (this.valorTotal) {
            this.valorTotal.textContent = `$${subtotal.toFixed(2)}`;
        }
    }
    
}

export { VistaCarrito };
