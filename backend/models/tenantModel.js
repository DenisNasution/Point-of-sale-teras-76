import mongoose from 'mongoose'

const tenantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

})

const Tenant = mongoose.model('Tenant', tenantSchema)

export default Tenant