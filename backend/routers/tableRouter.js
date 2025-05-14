import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import table from '../Data/table.js'
import Table from '../models/tableModel.js'
import { generateToken, isAdmin, isAuth, isSuperAdmin } from '../middleware/authMiddleware.js'

const tableRouter = express()
tableRouter.get('/seed', async (req, res) => {
    const createdTable = await Table.insertMany(table)
    res.send({ createdTable })
})

tableRouter.get('/', expressAsyncHandler(async (req, res) => {
    const table = await Table.find({})
    if (table) {
        res.send(table)
    }
    res.status(401).send({ message: "Data Tidak ditemukan" })
}))

tableRouter.get('/ready', expressAsyncHandler(async (req, res) => {
    const table = await Table.find({ inUsed: false })
    if (table) {
        res.send(table)
    }
    res.status(401).send({ message: "Data Tidak ditemukan" })
}))

tableRouter.post('/', async (req, res) => {
    const table = new Table({
        nomor: req.body.nomor
    })
    const createdTable = await table.save()
    res.send({ message: "Table Baru berhasil ditambahkan", table: createdTable })
})
tableRouter.put('/:id/ready/:status', async (req, res) => {
    const tableId = req.params.id
    const table = await Table.findById(tableId)
    // console.log(req.params.status);
    if (table) {
        table.inUsed = req.params.status
    }

    const updateTable = await table.save()
    res.send({ message: "Table Berhasil Dirubah", table: updateTable })
})

tableRouter.get('/:id', async (req, res) => {
    const tableId = req.params.id
    const table = await Table.findById(tableId)
    res.send(table)
})

tableRouter.put('/:id', async (req, res) => {
    const tableId = req.params.id
    const table = await Table.findById(tableId)
    if (table) {
        table.nomor = req.body.nomor
    }

    const updateTable = await table.save()
    res.send({ message: "Table Berhasil Dirubah", table: updateTable })
})

tableRouter.delete('/:id', async (req, res) => {
    const tableId = req.params.id
    const table = await Table.findById(tableId)
    if (table) {
        const deleteTable = await table.remove()
        res.send({ message: 'Table Berhasil di hapus', table: deleteTable })
    } else {
        res.status(404).send({ message: 'Table tidak ditemukan' })
    }
})

export default tableRouter