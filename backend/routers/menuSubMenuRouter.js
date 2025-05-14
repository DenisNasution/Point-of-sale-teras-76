import express from 'express'
import SubMenu from '../models/subMenuModel.js'

const menuSubMenuRouter = express.Router()

menuSubMenuRouter.get('/', async (req, res) => {
    const subMenu = await SubMenu.find()
    res.send(subMenu)
})

menuSubMenuRouter.post('/', async (req, res) => {
    const subMenu = new SubMenu({
        nama: req.body.nama,
        harga: req.body.harga,
        idMenu: req.body.idMenu,
        idTenant: req.body.idTenant,
    })
    const createdTenant = await subMenu.save()
    res.send({ message: "Tenant Baru berhasil ditambahkan", subMenu: createdTenant })
})

menuSubMenuRouter.get('/:id/menu', async (req, res) => {
    const menuId = req.params.id
    const subMenu = await SubMenu.find({ idMenu: menuId })
    res.send(subMenu)
})
menuSubMenuRouter.get('/:id', async (req, res) => {
    const subMenuId = req.params.id
    const subMenu = await SubMenu.findById(subMenuId)
    res.send(subMenu)
})

menuSubMenuRouter.put('/:id', async (req, res) => {
    const subMenuId = req.params.id
    const subMenu = await SubMenu.findById(subMenuId)
    if (subMenu) {
        subMenu.nama = req.body.nama
        subMenu.harga = req.body.harga
    }

    const updateTenant = await subMenu.save()
    res.send({ message: "Tenant Berhasil Dirubah", subMenu: updateTenant })
})

menuSubMenuRouter.delete('/:id', async (req, res) => {
    const subMenuId = req.params.id
    const subMenu = await SubMenu.findById(subMenuId)
    if (subMenu) {
        const deleteMenu = await subMenu.remove()
        res.send({ message: 'Tenant Berhasil di hapus', subMenu: deleteMenu })
    } else {
        res.status(404).send({ message: 'Tenant tidak ditemukan' })
    }
})

export default menuSubMenuRouter

