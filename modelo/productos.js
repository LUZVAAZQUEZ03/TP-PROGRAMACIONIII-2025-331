class Producto {
    constructor(id, nombre, precio, cantidad, fotoProducto, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = cantidad;
        this.fotoProducto = fotoProducto;
        this.categoria = categoria; // 'Perfume' o 'Skincare'
        this.estado = true;
    }
}