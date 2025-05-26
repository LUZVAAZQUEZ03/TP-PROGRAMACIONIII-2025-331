const bloqueAlta = document.getElementsByClassName("formularioAlta");
const bloqueInicio = document.getElementsByClassName("formularioLogin");

class VistaAdmin{
    constructor(){
        this.logs();


    }

    logs(){
        bloqueAlta.display("block")
        bloqueInicio.display("block")
    }

    mostrarAltaAdmin(){
        bloqueAlta.display("none")
        bloqueInicio.display("block")
        
    }
    mostrarLogInAdmin(){
        bloqueAlta.display("block")
        bloqueInicio.display("none")
    }

}