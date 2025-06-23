
import { Modelo } from "./modelos/Modelo.js";

import { VistaBienvenido } from "./vistas/vistaBienvenido.js";
import { VistaProductos } from "./vistas/vistaProductos.js";
import { VistaCarrito } from "./vistas/vistaCarrito.js";
import { VistaTicket } from "./vistas/vistaTicket.js";

import { ControlTicket } from "./controles/ticketController.js";
import { ControlBienvenido } from "./controles/loginController.js";
import { ControlProductos } from "./controles/productosController.js";
import { ControlCarrito } from "./controles/carritoController.js";


document.addEventListener("DOMContentLoaded", () => {
    const modelo = new Modelo();
    const path = window.location.pathname;

    if (path.includes("/bienvenido")) {
        const vistaBienvenido = new VistaBienvenido();
        new ControlBienvenido(modelo, vistaBienvenido);
    }

    else if (path.includes("/productos")) {
        console.log("Cargando vista de productos...");
        const vistaProductos = new VistaProductos();
        new ControlProductos(modelo, vistaProductos);
    }

    else if (path.includes("/carrito")) {
        console.log("Cargando vista de carrito...");
        const vistaCarrito = new VistaCarrito();
        new ControlCarrito(modelo, vistaCarrito);
    }

    else if (path.includes("/ticket")) {
        console.log("Cargando vista de ticket...");
        const vistaTicket = new VistaTicket();
        new ControlTicket(modelo, vistaTicket);
    }

    else {
        // Fallback por si no coincide nada
        console.warn("Ruta no reconocidacargando vista de bienvenida por defecto.");
        const vistaBienvenido = new VistaBienvenido();
        new ControlBienvenido(modelo, vistaBienvenido);
    }
});