class VistaProductos {
    productos;
    constructor() {
        this.productos = {
            contenedorPerfumes: this.$("perfume"),
            contenedorSkincare: this.$("skincare"),
            btnComprar: this.query(".boton"), // usa querySelector si es por clase
            seccionCategorias: this.$("categories"),
        };
    }
    $(id) {
        return document.getElementById(id);
    }
    query(selector) {
        return document.querySelector(selector);
    }
    // Si más adelante necesitás cargar productos dinámicamente
    mostrarProductos(arrayProductos) {
        const contPerfumes = this.productos.contPerfumes;
        const contSkincare = this.productos.contenedorSkincare;
        contPerfumes.innerHTML="";
        contSkincare.innerHTML="";
        arrayProductos.forEach(producto => {
            const div = producto.createHtmlElement();
            if(producto.categoria === "Perfume"){
                contPerfumes.appenCHild(div);
            }else if(producto.categoria ==="Skincare"){
                contSkincare.appenCHild(div);
            }
        });
    }
}
export { VistaProductos };