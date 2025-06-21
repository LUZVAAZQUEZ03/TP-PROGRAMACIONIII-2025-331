class VistaCarrito{
    constructor() {
        this.contenedorItems = this.$("carrito-container");
        this.botonContinuar = this.$("continuar-btn");
        this.botonFin= this.$("finalizar-btn");
        this.botonesSacar = this.$all(".removerBtn");
        this.contenedorSubtotal = this.$all(".subtotal");
        this.valorSubtotal = this.$("valorSubtotal");
        this.valorTotal = this.$("valorTotal");
    }

    $(id) {
        return document.getElementById(id);
    }
    $all(selector) {
        return document.querySelectorAll(selector);
    }

    mostrarProductosCarrito(productosCarrito) {
        this.contenedorItems.innerHTML = "";
        if (productosCarrito.length === 0) {
            this.contenedorItems.innerHTML = "<p>El carrito está vacío.</p>";
            if (this.valorSubtotal) {
                this.valorSubtotal.textContent = "0.00";
            }
            if (this.valorTotal) {
                this.valorTotal.textContent = "$0.00";
            }
            return;
        }

        productosCarrito.forEach((producto, index) => {
            const item = document.createElement("div");
            item.className = "carrito-item";

            item.innerHTML = `
                <img src="${producto.fotoProducto}" alt="${producto.nombre}" class="item__imagen" />
                <div class="item__detalle">
                    <p class="item__nombre">${producto.nombre}</p>
                    <p class="item__precio">$${producto.precio}</p>
                </div>
                <div class="product-quantity">
                    <input class="input-text2" type="number" value="1" min="1" max="${producto.stock}" data-index="${index}">
                </div>
                <p class="product-total" id="total-${index}">$${producto.precio}</p>
                <button class="boton removerBtn" data-idx="${index}">Quitar del carrito</button>
            `;

            this.contenedorItems.appendChild(item);
            
            const inputCantidad = item.querySelector('input[type="number"]');
            const totalElemento = item.querySelector(`#total-${index}`);

            inputCantidad.addEventListener("input", (e) => {
                let cantidad = parseInt(e.target.value);
                if (cantidad > producto.stock) {
                    alert(`Solo hay ${producto.stock} unidades disponibles.`);
                    cantidad = producto.stock;
                    e.target.value = producto.stock;
                }
                const total = producto.precio * cantidad;
                totalElemento.textContent = `$${total.toFixed(2)}`;

                // Recalculo subtotal
                this.actualizarSubtotal();
            });

            this.actualizarSubtotal();
        });
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
        if(this.valorTotal){
            this.valorTotal.textContent = `$${subtotal.toFixed(2)}`; 
        }
}
}
export {VistaCarrito};