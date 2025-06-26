class VistaProductos {
    productos;
    btnSiguiente;
    btnAnterior;
    constructor() {
        this.productos = {
            contenedorPerfumes: this.$("perfume"),
            contenedorSkincare: this.$("skincare"),
            seccionCategorias: this.$("categories"),
        };
        this.btnSiguiente = this.$("siguiente");
        this.btnAnterior = this.$("anterior");
    }
    $(id) {
        return document.getElementById(id);
    }
    mostrarProductos(arrayProductos) {
        const contPerfumes = this.productos.contenedorPerfumes;
        const contSkincare = this.productos.contenedorSkincare;
        contPerfumes.innerHTML="";
        contSkincare.innerHTML="";
        arrayProductos.forEach(producto => {
            const div = producto.createHtmlElement();
            if(producto.categoria.toLowerCase() === "perfume"){
                contPerfumes.appendChild(div);
            }else if(producto.categoria.toLowerCase() ==="skincare"){
                contSkincare.appendChild(div);
            }
        });
    }
}
export { VistaProductos };