
class ControlTicket{
    VistaTicket;
    Modelo;
    constructor(p_modelo,p_vista){
        this.Modelo=p_modelo;
        this.VistaTicket=p_vista;
        this.mostrarTicket();
        this.registrarBotonDescargarPDF();
    }
    mostrarTicket(){
        this.VistaTicket.mostrarTicket();
    }
    registrarBotonDescargarPDF(){
        this.VistaTicket.contenedor.botonPdf.addEventListener("click", (event) => {
            this.VistaTicket.generarPDF();
            alert("El ticket se ha descargado como PDF.");
            event.preventDefault();
        });
    }
}
export { ControlTicket };