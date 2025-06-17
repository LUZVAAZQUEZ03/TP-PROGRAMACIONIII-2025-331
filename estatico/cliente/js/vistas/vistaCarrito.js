class VistaCarrito{
    constructor() {
        this.contenedorItems = this.$("carrito-items");
        this.contenedorSubtotal = this.$("subtotal-valor");
    }

    $(id) {
        return document.getElementById(id);
    }

    mostrarProductosCarrito(productos) {
        this.contenedorItems.innerHTML = "";
        let subtotal = 0;

        productos.forEach((producto, index) => {
            const precio = parseFloat(producto.precio);
            const cantidad = parseInt(producto.cantidad || 1);
            const total = precio * cantidad;
            subtotal += total;

            const item = document.createElement("div");
            item.className = "carrito-item";
            item.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="item__imagen" />
                <div class="item__detalle">
                    <p class="item__nombre">${producto.nombre}</p>
                    <p class="item__precio">$${precio.toFixed(2)}</p>
                </div>
                <div class="product-quantity">
                    <input class="input-text2" type="number" value="${cantidad}" min="1" data-index="${index}">
                </div>
                <p class="product-total">$${total.toFixed(2)}</p>
                <button class="boton quitar-btn" data-index="${index}">Quitar del carrito</button>
            `;
            this.contenedorItems.appendChild(item);
        });

        this.contenedorSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    }
}
export {VistaCarrito};