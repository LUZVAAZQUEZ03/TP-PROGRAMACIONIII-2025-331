const { Venta } =require("../../model/ventas/venta.js");
const { DetalleVenta } = require("../../model/ventas/detalleVenta.js");

exports.createVenta = async (req,res) => {
    const transction = await Venta.sequelize.transaction();
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
        await transction.commit()
        res.status(201).json({ venta: nuevaVenta, detalles });
    } catch (error) {
        console.error("Error al registrar la venta:", error);
        res.status(500).json({ error: error.message });
    }
}