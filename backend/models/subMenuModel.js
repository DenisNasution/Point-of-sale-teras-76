import mongoose from 'mongoose'

const subMenuSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    harga: {
        type: Number,
        required: true
    },
    idMenu: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Menu'
    },
    idTenant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tenant'
    }


})
const SubMenu = mongoose.model('SubMenu', subMenuSchema)

export default SubMenu