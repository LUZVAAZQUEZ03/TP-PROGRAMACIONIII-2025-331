document.addEventListener("DOMContentLoaded", () => {
    const inputNombre = document.getElementById("nombreCliente");
    const botonComenzar = document.getElementById("btnComenzar");

    botonComenzar.addEventListener("click", () => {
        const nombre = inputNombre.value.trim();

        if (nombre === "" || !isNaN(nombre) || nombre.length <3) {
            alert("Por favor, ingresa tu nombre correctamente.");
            return;
        }
        // Guardar el nombre en localStorage
        localStorage.setItem("nombreUsuario", nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase());
        inputNombre.textContent ="";
        // Redireccionar a productos.html
        window.location.href = "productos.html";
    });
});