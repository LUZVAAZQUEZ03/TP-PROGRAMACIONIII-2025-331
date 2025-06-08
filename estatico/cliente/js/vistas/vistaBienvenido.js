class VistaBienvenido{
    entradaCliente;
    constructor(){
        this.entradaCliente={
            nombreCliente:this.$("nombreCliente"),
            btnComenzar :this.$("btnComenzar")
        }
    }
    $(id){
        return document.getElementById(id);
    }
}
export {VistaBienvenido};