import { Producto } from "../../../model/productos.js";
import { Modelo } from "./modelos/Modelo.js";
import { VistaBienvenido } from "./vistas/vistaBienvenido.js";
import { VistaProductos } from "./vistas/vistaProductos.js";
import { VistaCarrito } from "./vistas/vistaCarrito.js";
import { VistaTicket } from "./vistas/vistaTicket.js";
import { ControlBienvenido } from "./controles/loginController.js";

const model = new Modelo();
const vistaBienvenido = new VistaBienvenido();
const controladorBienvenido = new ControlBienvenido(model, vistaBienvenido);
