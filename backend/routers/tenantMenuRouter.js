import express from 'express'
import Menu from '../models/menuModel.js'
import SubMenu from '../models/subMenuModel.js'

const tenantMenuRouter = express.Router()

tenantMenuRouter.get('/', async (req, res) => {
    const menu = await Menu.find()
    res.send(menu)
})

tenantMenuRouter.post('/', async (req, res) => {
    const menu = new Menu({
        nama: req.body.nama,
        harga: req.body.harga,
        idTenant: req.body.idTenant,
    })
    const createdTenant = await menu.save()
    res.send({ message: "Tenant Baru berhasil ditambahkan", menu: createdTenant })
})

tenantMenuRouter.get('/:id/tenant', async (req, res) => {
    const tenantId = req.params.id
    const menu = await Menu.find({ idTenant: tenantId })
    res.send(menu)
})
tenantMenuRouter.get('/:id', async (req, res) => {
    const menuId = req.params.id
    const menu = await Menu.findById(menuId)
    res.send(menu)
})

tenantMenuRouter.put('/:id', async (req, res) => {
    const menuId = req.params.id
    const menu = await Menu.findById(menuId)
    if (menu) {
        menu.nama = req.body.nama
        menu.harga = req.body.harga
    }

    const updateTenant = await menu.save()
    res.send({ message: "Tenant Berhasil Dirubah", menu: updateTenant })
})

tenantMenuRouter.delete('/:id', async (req, res) => {
    const menuId = req.params.id
    const menu = await Menu.findById(menuId)
    const subMenu = await SubMenu.find({ idMenu: menuId })
    // res.send(subMenu)
    if (menu) {
        const deleteMenu = await menu.remove()
        if (subMenu) {
            await SubMenu.deleteMany({ idMenu: menuId })
        }
        res.send({ message: 'Menu Berhasil di hapus', menu: deleteMenu })
    } else {
        res.status(404).send({ message: 'Menu tidak ditemukan' })
    }
})

export default tenantMenuRouter

