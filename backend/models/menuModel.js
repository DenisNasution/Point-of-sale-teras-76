import mongoose from 'mongoose'

const menuSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    harga: {
        type: Number,
        required: true
    },
    idTenant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tenant'
    }
})

const Menu = mongoose.model('Menu', menuSchema)

export default Menu