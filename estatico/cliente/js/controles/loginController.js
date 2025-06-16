class ControlBienvenido{
    Modelo;
    VistaBienvenido;
    constructor(p_modelo,p_vista){
        this.Modelo=p_modelo;
        this.VistaBienvenido=p_vista;
        this.registrarBotones();
    }
    registrarBotones() {
        const inputNombre = this.VistaBienvenido.entradaCliente.nombreCliente;
        const botonComenzar = this.VistaBienvenido.entradaCliente.btnComenzar;
        botonComenzar.addEventListener("click", () => {
            const nombre = inputNombre.value.trim();
            if (!this.validarNombre(nombre)) return;

            localStorage.setItem("nombreUsuario", nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase());
            inputNombre.value = "";
            window.location.href = "productos.html";
        });
}

    validarNombre(nombre){
        const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
        if (nombre === "") {
            alert("El nombre no puede estar vacio.");
            return false;
        }

        if (!isNaN(nombre)) {
            alert("El nombre no puede ser un nmero.");
            return false;
        }

        if (nombre.length < 3) {
            alert("El nombre debe tener al menos 3 caracteres.");
            return false;
        }

        if (!soloLetras.test(nombre)) {
            alert("El nombre solo puede contener letras y espacios.");
            return false;
        }
        return true;
    }
}
export {ControlBienvenido};

