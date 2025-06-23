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
        this.VistaTicket.contenedor.botonPdf.addEventListener("click", () => {
            localStorage.clear();

        window.location.href = "bienvenido.html";
        });
    }
}
export { ControlTicket };