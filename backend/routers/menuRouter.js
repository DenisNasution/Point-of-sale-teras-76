import express from 'express'
import Tenant from '../models/tenantModel.js'
import Menu from '../models/menuModel.js'
import SubMenu from '../models/subMenuModel.js'
import menu from '../Data/menu.js'

const menuRouter = express.Router()

menuRouter.get('/', async (req, res) => {
    const tenants = await Tenant.find()
    res.send(tenants)
})

menuRouter.get('/:id/menu', async (req, res) => {
    const menus = await Menu.find({ idTenant: req.params.id })
    res.send(menus)
})

menuRouter.get('/:id/subMenu', async (req, res) => {
    const subMenus = await SubMenu.find({ idMenu: req.params.id })
    res.send(subMenus)
})

menuRouter.get('/seed', async (req, res) => {
    const createdMenu = await Menu.insertMany(menu)
    res.send({ createdMenu })
})

export default menuRouter