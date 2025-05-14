import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    orderItems: [{
        idMenu: { type: String, required: true },
        harga: { type: Number, required: true },
        jumlah: { type: Number, required: true },
        namaPesanan: { type: String, required: true },
        idTenant: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant' },
    }
    ],
    table: {
        nomor: { type: String, required: true },
        idTable: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Table' }
    },
    status: { type: Boolean, required: true, default: false },
    totalPrice: { type: Number, required: true }


}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order