const  Venta  =require("../../model/ventas/venta.js");
const  DetalleVenta  = require("../../model/ventas/detalleVenta.js");
const { Producto } = require("../../model/productos/producto.js");
const sequelize = require("../../servicios/sequelize");

exports.createVenta = async (req,res) => {
    const transaction  = await sequelize.transaction();

    try {
        const {cliente, productos, total} = req.body;
        const nuevaVenta = await Venta.create({
            cliente,
            total,
            fecha: new Date()
        }, { transaction });

        const detalles = productos.map(p => ({
            venta_id: nuevaVenta.id,
            producto_id: p.id,
            cantidad: p.cantidad,
            precio_unitario: p.precio,
            subtotal: p.cantidad * p.precio
        }));

        await DetalleVenta.bulkCreate(detalles, { transaction });

        for (const p of productos) {
            const productoEnBD = await Producto.findByPk(p.id, { transaction });

            if (!productoEnBD) {
                throw new Error(`Producto con ID ${p.id} no encontrado`);
            }

            if (productoEnBD.stock < p.cantidad) {
                throw new Error(`Stock insuficiente para el producto ${productoEnBD.nombre}`);
            }

            productoEnBD.stock -= p.cantidad;
            if (productoEnBD.stock==0){
                productoEnBD.estado = false; // Cambia el estado a false si el stock llega a 0
            }
            await productoEnBD.save({ transaction });
        }
        await transaction .commit()
        res.status(201).json({ venta: nuevaVenta, detalles });

    } catch (error) {
        console.log("ENTRO ERROR")
        console.error("Error al registrar la venta:", error);
        res.status(500).json({ error: error.message });
    }
}