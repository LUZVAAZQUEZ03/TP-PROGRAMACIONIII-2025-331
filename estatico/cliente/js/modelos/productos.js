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
    static createFromObject(obj) {
    return new Producto(
        obj.id,
        obj.nombre,
        obj.precio,
        obj.stock,         
        `http://localhost:3000/${obj.fotoProducto}`,
        obj.categoria
    );
}

    guardarProductoCarrito() {
        const clave = `producto${this.id}`; //aca traigo el id de mi serie
        localStorage.setItem(clave, this.toJsonString());  //local storage solo recive strings
    }
    toJsonString() {
        return JSON.stringify({
        id: this.id,
        nombre: this.nombre,
        precio:this.precio,
        stock:this.stock,
        fotoProducto: this.fotoProducto,
        categoria:this.categoria,
        estado:this.estado
        });
    }
    static createFromJsonString(json) {
        const data = JSON.parse(json);
        return new Serie(
        data.id,
        data.nombre,
        data.precio,
        data.stock,
        data.fotoProducto,
        data.categoria,
        data.estado,
        );
    }
    createHtmlElement() {
        const contenedor = document.createElement('div');
        contenedor.classList.add("tarjeta");
        contenedor.className = 'producto';

        const nombreProducto = document.createElement('h2');
        nombreProducto.textContent = this.nombre;

        const precioProducto = document.createElement('p');
        precioProducto.textContent = `Precio: ${this.precio}`;

        const img = document.createElement('img');
        img.src = this.fotoProducto;
        img.alt = `${this.nombre} imagen`;
        img.addEventListener('click', () => {
            window.open(this.url, '_blank');
        });

        contenedor.appendChild(nombreProducto);
        contenedor.appendChild(precioProducto);
        contenedor.appendChild(img);
        const enCarrito = localStorage.getItem(`producto${this.id}`) !== null;

        if (enCarrito) {
            const agregado = document.createElement("span");
            agregado.innerHTML = "✔️ ¡Agregado!";
            agregado.style.color = "green";
            agregado.style.fontWeight = "bold";
            contenedor.appendChild(agregado);
        } else {
            const btnAgregarCarrito = document.createElement('button');
            btnAgregarCarrito.classList.add("boton");
            btnAgregarCarrito.textContent = "Agregar al Carrito";
            btnAgregarCarrito.addEventListener('click', () => {
                this.guardarProductoCarrito();

                const check = document.createElement("span");
                check.innerHTML = "✔️ ¡Agregado!";
                check.style.color = "green";
                check.style.fontWeight = "bold";
                btnAgregarCarrito.replaceWith(check);
            });
            contenedor.appendChild(btnAgregarCarrito);
        }
        return contenedor;
    }
}
export { Producto };