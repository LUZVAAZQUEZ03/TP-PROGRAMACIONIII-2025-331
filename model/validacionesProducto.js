const validateProduct = {
    // Validar nombre del producto: obligatorio, mínimo 3, máximo 50 caracteres
    async validateName(productName) {
        if (typeof productName !== 'string' || productName.trim().length < 3 || productName.length > 50) {
            throw new Error("El nombre del producto debe tener entre 3 y 50 caracteres.");
        }
    },

    // Validar precio
    async validatePrecio(precio) {
        const valor = parseFloat(precio);
        if (isNaN(valor) || valor <= 0) {
            throw new Error("El precio debe ser un número mayor a 0.");
        }
    },

    // Validar stock: obligatorio, número entero, mayor o igual a 0
    async validateStock(stock) {
        const cantidad = parseInt(stock);
        if (isNaN(cantidad) || cantidad < 0 || !Number.isInteger(cantidad)) {
            throw new Error("El stock debe ser un número entero mayor o igual a 0.");
        }
    },

    // Validar imagen: string con formato URL de imagen (termina en .jpg, .jpeg, .png, .webp, etc.)
    async validateImage(image) {
        const regexImagen = /\.(jpg|jpeg|png)$/i;
        if (typeof image !== 'string' || !regexImagen.test(image)) {
            throw new Error("La imagen debe ser una URL válida que termine en .jpg, .png");
        }
    },

    // Validar categoría
    async validateCategory(category) {
        if (category !== 'Perfume' || category !== 'Skincare') {
            throw new Error('solo pueden ser tipo Perfume o Skincare');
        }
    },

    async validate(productName,precio,stock,image,category){
        try {
            await this.validateName(productName);
            await this.validatePrecio(precio);
            await this.validateStock(stock);
            await this.validateImage(image);
            await this.validateCategory(category);

            console.log("Todas las validaciones correctas.");
        } catch (error) {
            throw new Error(`Validación fallida: ${error.message}`);
        }
}
};

module.exports = validateProduct;