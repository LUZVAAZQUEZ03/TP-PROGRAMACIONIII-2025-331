const  Venta  =require("../../model/ventas/venta.js");
const  DetalleVenta  = require("../../model/ventas/detalleVenta.js");
const { Producto } = require("../../model/productos/producto.js");
const sequelize = require("../../servicios/sequelize");

exports.createVenta = async (req,res) => {
    const transction = await sequelize.transaction();
    console.log("DATOSSSS "+req.body);
    try {
        const {cliente, productos, total} = req.body;
        const nuevaVenta = await Venta.create({
            cliente,
            total,
            fecha: new Date()
        }, { transaction: transction });
        const detalles = productos.map(p => ({
            ventaId: nuevaVenta.id,
            productoId: p.id,
            cantidad: p.cantidad,
            precioUnitario: p.precio,
            subtotal: p.cantidad * p.precio
        }));
        await DetalleVenta.bulkCreate(detalles, { transaction: transction });
        for (const p of productos) {
            const productoEnBD = await Producto.findByPk(p.id, { transction });
            if (!productoEnBD) {
                throw new Error(`Producto con ID ${p.id} no encontrado`);
            }
            if (productoEnBD.stock < p.cantidad) {
                throw new Error(`Stock insuficiente para el producto ${productoEnBD.nombre}`);
            }

            productoEnBD.stock -= p.cantidad;
            await productoEnBD.save({ transction });
        }
        await transction.commit()
        res.status(201).json({ venta: nuevaVenta, detalles });
    } catch (error) {
        console.log("ENTRO ERROR")
        console.error("Error al registrar la venta:", error);
        res.status(500).json({ error: error.message });
    }
}