import express from 'express'
import Tenant from '../models/tenantModel.js'
import Menu from '../models/menuModel.js'
import SubMenu from '../models/subMenuModel.js'

const tenantRouter = express.Router()

tenantRouter.get('/', async (req, res) => {
    const tenant = await Tenant.find()
    res.send(tenant)
})

tenantRouter.post('/', async (req, res) => {
    const tenant = new Tenant({
        name: req.body.name
    })
    const createdTenant = await tenant.save()
    res.send({ message: "Tenant Baru berhasil ditambahkan", tenant: createdTenant })
})

tenantRouter.get('/:id', async (req, res) => {
    const tenantId = req.params.id
    const tenant = await Tenant.findById(tenantId)
    res.send(tenant)
})

tenantRouter.put('/:id', async (req, res) => {
    const tenantId = req.params.id
    const tenant = await Tenant.findById(tenantId)
    if (tenant) {
        tenant.name = req.body.name
    }

    const updateTenant = await tenant.save()
    res.send({ message: "Tenant Berhasil Dirubah", tenant: updateTenant })
})

tenantRouter.delete('/:id', async (req, res) => {
    const tenantId = req.params.id
    const tenant = await Tenant.findById(tenantId)
    const menu = await Menu.find({ idTenant: tenantId })
    const subMenu = await SubMenu.find({ idTenant: tenantId })
    if (tenant) {
        const deleteTenant = await tenant.remove()
        if (menu) {
            await Menu.deleteMany({ idTenant: tenantId })
            if (subMenu) {
                await SubMenu.deleteMany({ idTenant: tenantId })
            }
        }
        res.send({ message: 'Tenant Berhasil di hapus', tenant: deleteTenant })
    } else {
        res.status(404).send({ message: 'Tenant tidak ditemukan' })
    }
})

export default tenantRouter

