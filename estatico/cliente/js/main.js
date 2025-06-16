
import { Modelo } from "./modelos/Modelo.js";

import { VistaBienvenido } from "./vistas/vistaBienvenido.js";
import { VistaProductos } from "./vistas/vistaProductos.js";


import { ControlBienvenido } from "./controles/loginController.js";
import { ControlProductos } from "./controles/productosController.js";

document.addEventListener("DOMContentLoaded", () => {
    const modelo = new Modelo();
    const path = window.location.pathname;

    if (path.includes("bienvenido.html")) {
        const vistaBienvenido = new VistaBienvenido();
        new ControlBienvenido(modelo, vistaBienvenido);
    }

    else if (path.includes("productos.html")) {
        const vistaProductos = new VistaProductos();
        new ControlProductos(modelo, vistaProductos);
    }

    else if (path.includes("carrito.html")) {
        const vistaCarrito = new vistaCarrito();
        new ControlCarrito(modelo, vistaCarrito);
    }

    else if (path.includes("ticket.html")) {
        const vistaTicket = new VistaTicket();
        new ControlTicket(modelo, vistaTicket);
    }

    else {
        // Fallback por si no coincide nada
        const vistaBienvenido = new VistaBienvenido();
        new ControlBienvenido(modelo, vistaBienvenido);
    }
});