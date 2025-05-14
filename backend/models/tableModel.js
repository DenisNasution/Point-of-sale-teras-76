import mongoose from 'mongoose'

const tableSchema = new mongoose.Schema({
    nomor: {
        type: String,
        required: true
    },
    inUsed: {
        type: Boolean,
        required: true,
        default: false
    },
})

const Table = mongoose.model('Table', tableSchema)

export default Table