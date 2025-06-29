
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
    obtenerDatosTicket() {
        const productos = JSON.parse(localStorage.getItem("productosTicket")) || [];
        const nombreCliente = localStorage.getItem("nombreUsuario") || "Cliente";
        const fecha = new Date();
        const fechaTexto = fecha.toISOString().split("T")[0]; // yyyy-mm-dd
        const horaTexto = fecha.toTimeString().slice(0, 5);

        let total = 0;
        const items = productos.map(prod => {
            const { nombre, precio, categoria, cantidad } = prod;
            const subtotal = cantidad * Number(precio);
            total += subtotal;
            return {
                nombre,
                precio: Number(precio),
                categoria: categoria || "N/A",
                cantidad,
                subtotal
            };
        });

        return { nombreCliente, fechaTexto, horaTexto, items, total };
    }
    generarHTMLTicket(datos) {
        const { nombreCliente, fechaTexto, horaTexto, items, total } = datos;

        const cabecera = `
            <div id="ticket-header">
                <h2>Ticket de Compra</h2>
                <p><strong>Fecha:</strong> ${fechaTexto}</p>
                <p><strong>Hora:</strong> ${horaTexto}</p>
                <h1>Gracias por tu compra, ${nombreCliente}</h1>
            </div>`;

        const detalle = `
            <div id="ticket-info">
                ${items.map(item => `
                    <p><strong>Producto:</strong> ${item.nombre}</p>
                    <p><strong>Categoría:</strong> ${item.categoria}</p>
                    <p><strong>Cantidad:</strong> ${item.cantidad}</p>
                    <p><strong>Precio Unitario:</strong> $${item.precio.toFixed(2)}</p>
                    <p><strong>Subtotal:</strong> $${item.subtotal.toFixed(2)}</p>
                    <hr style="margin: 1rem 0; border: 1px solid #555;">
                `).join("")}
            </div>`;

        const pie = `
            <div id="ticket-total">
                <h3>Total: $${total.toFixed(2)}</h3>
            </div>`;

        return { cabecera, detalle, pie };
    }
    mostrarTicket() {
        const datos = this.obtenerDatosTicket();
        const html = this.generarHTMLTicket(datos);

        if (datos.items.length === 0) {
            this.contenedor.info.innerHTML = "<p>No hay productos en el ticket</p>";
            this.contenedor.total.innerHTML = "<h3>Total: $0.00</h3>";
            return;
        }

        this.contenedor.header.innerHTML = html.cabecera;
        this.contenedor.info.innerHTML = html.detalle;
        this.contenedor.total.innerHTML = html.pie;
    }
    //probando documentacion 
    /**
 * Genera un archivo PDF con el contenido del ticket de compra
 * y lo descarga automáticamente en el navegador.
 * 
 * Esta función:
 * - Obtiene los datos del ticket desde el localStorage.
 * - Genera el HTML completo con los datos del ticket.
 * - Envía ese HTML al backend mediante `fetch()` para generar el PDF con Puppeteer.
 * - Descarga el archivo PDF en el navegador del cliente.
 * - Limpia el localStorage y redirige a "bienvenido.html".
 */
    generarPDF() {
        const datos = this.obtenerDatosTicket();
        const html = this.generarHTMLTicket(datos);

        const htmlCompleto = `
            <html>
                <head>
                    <meta charset="utf-8">
                    <link rel="stylesheet" href="http://localhost:3000/estilos/estilos.css">
                </head>
                <header class="contenedor header-productos">
                    <div class="logo">
                        <img src="http://localhost:3000/img/beauscent.png" alt="Logo BeauScent" onclick="location.href='/cliente/productos'">
                    </div>
                </header>
                <body>
                    ${html.cabecera}            
                    ${html.detalle}
                    ${html.pie}
                </body>
            </html>
        `;
        console.log("Cabecera:", html.cabecera);
        console.log("Detalle:", html.detalle);
        console.log("Pie:", html.pie);

        fetch('/ticket/ticket-pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dataTicket:htmlCompleto })// convierto el HTML a JSON para enviarlo al servidor
        })
        .then(response => response.blob()) // blob es un objeto que representa datos binarios
        .then(blob => {
            const url = window.URL.createObjectURL(blob);// crea una URL temporal para el blob
            console.log("URL:", url);
            const a = document.createElement('a');// crea un enlace temporal
            a.href = url;
            a.download = 'ticket_compra.pdf';
            a.click();
            window.URL.revokeObjectURL(url);// libera la URL temporal

            localStorage.clear();
            window.location.href = "bienvenido.html";
        })
        .catch(error => {
            console.error("Error al generar PDF:", error);
            alert("Hubo un error al generar el ticket PDF.");
        })
        .finally(() => {
            console.log("PDF generado exitosamente");
        });
    }
}


export { VistaTicket };