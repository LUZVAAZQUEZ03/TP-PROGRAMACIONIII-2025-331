const { Venta } =require("../../model/venta.js");
const { DetalleVenta } = require("../../model/detalleVenta.js");

exports.createVenta = async (req,res) => {
    try {
        const {cliente, productos, total} = req.body;
        const nuevaVenta = await Venta.create({
            cliente,
            total,
            fecha: new Date()
        });

        await DetalleVenta.bulkCreate(productos.map(p => ({
            ventaId: nuevaVenta.id,
            productoId: p.id,
            cantidad: p.cantidad,
            precioUnitario: p.precio,
            subtotal: p.cantidad * p.precio
        })));


        res.status(201).json({ venta: nuevaVenta, DetalleVenta });
    } catch (error) {
        console.error("Error al registrar la venta:", error);
        res.status(500).json({ error: error.message });
    }
}