class VistaTicket {
    constructor() {
        this.contenedor = {
            header: this.$("ticket-header"),
            info: this.$("ticket-info"),
            total: this.$("ticket-total"),
            botonPdf: this.$("descargar-pdf-btn"),
        };
    }

    $(id) {
        return document.getElementById(id);
    }

    mostrarTicket() {
        const productosGuardados = JSON.parse(localStorage.getItem("productosTicket")) || [];
        console.log("Productos en el ticket:", productosGuardados);
        if (productosGuardados.length === 0) {
            this.contenedor.info.innerHTML = "<p>No hay productos en el ticket</p>";
            this.contenedor.total.textContent = "Total: $0.00";
            return;
        }

        // Datos cliente y fecha
        const nombreCliente = localStorage.getItem("nombreUsuario") || "Cliente";
        const fecha = new Date();
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();
        const fechaTexto = `${anio}-${mes}-${dia}`;
        const horaTexto = fecha.toTimeString().split(" ")[0].slice(0, 5);

        this.contenedor.header.innerHTML = `
            <h2>Ticket de Compra</h2>
            <p><strong>Fecha:</strong> ${fechaTexto}</p>
            <p><strong>Hora:</strong> ${horaTexto}</p>
            <h1>Gracias por tu compra, ${nombreCliente}</h1>
        `;

        // Mostrar productos y calcular total
        let total = 0;
        this.contenedor.info.innerHTML = "";

        productosGuardados.forEach(prod => {
            const { nombre, precio, categoria, cantidad } = prod;
            const subtotal = cantidad * Number(precio);
            total += subtotal;

            const itemHTML = `
                <p><strong>Producto:</strong> ${nombre}</p>
                <p><strong>Categoría:</strong> ${categoria || "N/A"}</p>
                <p><strong>Cantidad:</strong> ${cantidad}</p>
                <p><strong>Precio Unitario:</strong> $${Number(precio).toFixed(2)}</p>
                <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
                <hr style="margin: 1rem 0; border: 1px solid #555;">
            `;
            this.contenedor.info.insertAdjacentHTML("beforeend", itemHTML);
        });

        this.contenedor.total.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
    }
}

export { VistaTicket };