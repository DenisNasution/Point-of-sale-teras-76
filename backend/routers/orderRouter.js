import express from 'express'
import Order from '../models/orderModel.js'
import mongoose from 'mongoose'

const orderRouter = express.Router()

orderRouter.get('/', async (req, res) => {
    const order = await Order.find()
    res.send(order)
})
orderRouter.get('/paid/now/tenant', async (req, res) => {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const order = await Order.aggregate([
        { "$unwind": "$orderItems" },
        {
            '$lookup': {
                'from': 'tenants',
                'localField': 'orderItems.idTenant',
                'foreignField': '_id',
                'as': 'tenantId'
            }
        },
        { '$unwind': { path: "$tenantId" } },
        { "$unwind": "$orderItems.harga" },
        { $match: { createdAt: { $gte: startOfToday }, status: true } },
        { $group: { _id: "$orderItems.idTenant", "name": { $first: "$tenantId.name" }, total: { $sum: "$orderItems.harga" } } },
        // { $group: { _id: "$_id.idTenant", "name": { $first: "$name" }, "v": { "$push": { "idMenu": "$_id.idMenu", "namaPesanan": "$namaPesanan", "count": "$count" } }, "total": { $first: "$total" } } },
        { $sort: { _id: 1 } }
    ])

    res.send(order)
})
orderRouter.get('/rincian/tenant/:id', async (req, res) => {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const order = await Order.aggregate([
        { "$unwind": "$orderItems" },
        {
            '$lookup': {
                'from': 'tenants',
                'localField': 'orderItems.idTenant',
                'foreignField': '_id',
                'as': 'tenantId'
            }
        },
        { '$unwind': { path: "$tenantId" } },
        { "$unwind": "$orderItems.jumlah" },
        { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
        { $group: { _id: { "idTenant": "$tenantId._id", "idMenu": "$orderItems.idMenu" }, "name": { $first: "$tenantId.name" }, namaPesanan: { "$first": "$orderItems.namaPesanan" }, "tanggal": { $first: "$createdAt" }, jumlah: { $first: "$orderItems.jumlah" } } },
        { $group: { _id: "$_id.idTenant", "name": { $first: "$name" }, "tanggal": { $first: "$tanggal" }, "v": { "$push": { "idMenu": "$_id.idMenu", "namaPesanan": "$namaPesanan", "jumlah": "$jumlah" } } } },
    ])
    // console.log(order);
    res.send(order)
})

orderRouter.get('/paid/now/table', async (req, res) => {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const order = await Order.find({ status: true, createdAt: { $gte: startOfToday } })

    res.send(order)
})
orderRouter.get('/paid/now/transaction', async (req, res) => {
    const endAt = req.query.endAt
    const startAt = req.query.startAt
    const start = startAt.toString()
    const end = endAt.toString()
    const mulai = new Date(start);
    const akhir = new Date(end);
    akhir.setDate(akhir.getDate() + 1)
    // const order = await Order.find({ createdAt: { $gte: mulai, $lt: akhir } })
    console.log(mulai);
    console.log(akhir);
    const order = await Order.aggregate([
        { "$unwind": "$orderItems" },
        {
            '$lookup': {
                'from': 'tenants',
                'localField': 'orderItems.idTenant',
                'foreignField': '_id',
                'as': 'tenantId'
            }
        },
        { '$unwind': { path: "$tenantId" } },
        { "$unwind": "$orderItems.harga" },
        { $match: { createdAt: { $gte: mulai, $lt: akhir }, status: true } },
        { $group: { _id: "$orderItems.idTenant", "name": { $first: "$tenantId.name" }, total: { $sum: "$orderItems.harga" }, mulai: { $first: startAt } } },
        { $sort: { _id: 1 } },
        { $group: { _id: "", mulai: { $first: startAt }, akhir: { $first: endAt }, "v": { "$push": { idTenant: "$_id", "name": "$name", "total": "$total" } }, } },
    ])
    // console.log(order)

    res.send(order)
})

orderRouter.get('/chart/tenant/:id', async (req, res) => {
    let TODAY = "2021-06-19T23:59:59"
    let YEAR_BEFORE = "2021-01-01T00:00:00"
    const mulai = new Date(YEAR_BEFORE);
    const akhir = new Date(TODAY);

    const order = await Order.aggregate([
        { "$unwind": "$orderItems" },
        {
            '$lookup': {
                'from': 'tenants',
                'localField': 'orderItems.idTenant',
                'foreignField': '_id',
                'as': 'tenantId'
            }
        },
        { '$unwind': { path: "$tenantId" } },
        { "$unwind": "$orderItems.harga" },

        {
            $match: {
                "orderItems.idTenant": new mongoose.Types.ObjectId(req.params.id),
                // $expr: { $and: [{ created_at: ['$lte', TODAY] }, { created_at: ['$gte', YEAR_BEFORE] }] },
                status: true,
            }
        },

        {
            $project:
            {
                _id: 1,
                yearBillDate: { $year: "$createdAt" },
                monthBillDate: { $month: "$createdAt" },
                'orderItems.harga': 1,
                'tenantId.name': 1
            }
        },
        {
            $group:
            {

                _id: { yearBillDate: "$yearBillDate", monthBillDate: "$monthBillDate" },
                name: { $first: "$tenantId.name" },
                total: { $sum: "$orderItems.harga" },
                monthBillDate1: { $first: "$monthBillDate" },

            }
        },
        { $sort: { monthBillDate1: 1 } }

    ])
    res.send(order)
})
orderRouter.get('/chart/whole', async (req, res) => {

    const order = await Order.aggregate([

        {
            $match: {
                status: true,
            }
        },

        {
            $project:
            {
                _id: 1,
                yearBillDate: { $year: "$createdAt" },
                monthBillDate: { $month: "$createdAt" },
                'totalPrice': 1,
            }
        },
        {
            $group:
            {

                _id: { yearBillDate: "$yearBillDate", monthBillDate: "$monthBillDate" },
                monthBillDate1: { $first: "$monthBillDate" },
                total: { $sum: "$totalPrice" },


            },
        },
        { $sort: { monthBillDate1: 1 } }


    ])
    res.send(order)
})

orderRouter.get('/paid/now/transaction/:id/detail', async (req, res) => {
    const endAt = req.query.endAt
    const startAt = req.query.startAt
    const start = startAt.toString()
    const end = endAt.toString()
    var mulai = new Date(start);
    var akhir = new Date(end);
    akhir.setDate(akhir.getDate() + 1)
    // const order = await Order.find({ createdAt: { $gte: mulai, $lt: akhir } })
    const order = await Order.aggregate([
        { "$unwind": "$orderItems" },
        {
            '$lookup': {
                'from': 'tenants',
                'localField': 'orderItems.idTenant',
                'foreignField': '_id',
                'as': 'tenantId'
            }
        },
        { '$unwind': { path: "$tenantId" } },
        { "$unwind": "$orderItems.harga" },
        { $match: { createdAt: { $gte: mulai, $lt: akhir }, status: true, "orderItems.idTenant": new mongoose.Types.ObjectId(req.params.id) } },
        { $group: { _id: { "idTenant": "$tenantId._id", "idMenu": "$orderItems.idMenu" }, namaPesanan: { "$first": "$orderItems.namaPesanan" }, count: { $sum: "$orderItems.jumlah" }, "name": { $first: "$tenantId.name" }, "tanggal": { $first: "$createdAt" } } },
        { $sort: { '_id.idMenu': 1 } },
        { $group: { _id: "$_id.idTenant", "name": { $first: "$name" }, "tanggal": { $first: "$tanggal" }, "v": { "$push": { "idMenu": "$_id.idMenu", "namaPesanan": "$namaPesanan", "count": "$count" } }, } },
    ])

    res.send(order)
})
orderRouter.get('/paid/now/:id', async (req, res) => {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const order = await Order.aggregate([
        { "$unwind": "$orderItems" },
        {
            '$lookup': {
                'from': 'tenants',
                'localField': 'orderItems.idTenant',
                'foreignField': '_id',
                'as': 'tenantId'
            }
        },
        { '$unwind': { path: "$tenantId" } },
        { "$unwind": "$orderItems.harga" },
        { "$unwind": "$orderItems.jumlah" },
        { $match: { createdAt: { $gte: startOfToday }, status: true, "orderItems.idTenant": new mongoose.Types.ObjectId(req.params.id) } },

        { $group: { _id: { "idTenant": "$tenantId._id", "idMenu": "$orderItems.idMenu" }, namaPesanan: { "$first": "$orderItems.namaPesanan" }, count: { $sum: "$orderItems.jumlah" }, "name": { $first: "$tenantId.name" }, "tanggal": { $first: "$createdAt" } } },
        { $sort: { '_id.idMenu': 1 } },

        { $group: { _id: "$_id.idTenant", "name": { $first: "$name" }, "tanggal": { $first: "$tanggal" }, "v": { "$push": { "idMenu": "$_id.idMenu", "namaPesanan": "$namaPesanan", "count": "$count" } }, } },
    ])

    res.send(order)
})

orderRouter.post('/', async (req, res) => {
    const { orderItems, table, status, totalPrice } = req.body
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No Order Items')
        return
    } else {
        const order = new Order({
            orderItems, table, status, totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

orderRouter.get('/paid/:type', async (req, res) => {
    const order = await Order.find({ status: req.params.type })
    res.send(order)
})

orderRouter.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id)
    res.send(order)
})
orderRouter.put('/:id/order', async (req, res) => {
    const cartItems = req.body
    const order = await Order.findById(req.params.id)
    if (order) {
        cartItems.map(item => {
            order.orderItems.map(ord => {
                if (item.idMenu === ord.idMenu) {
                    const tambahJumlah = parseInt(item.jumlah) + ord.jumlah
                    const hargaTotal = item.harga + ord.harga
                    ord.jumlah = tambahJumlah
                    ord.harga = hargaTotal
                }

            })
        })
        const results2 = cartItems.filter(({ idMenu: id1 }) => !order.orderItems.some(({ idMenu: id2 }) => id2 === id1));
        results2.map(item => {
            const orderAdd = {
                idMenu: item.idMenu,
                namaPesanan: item.namaPesanan,
                jumlah: item.jumlah,
                idTenant: item.idTenant,
                harga: item.harga
            }
            order.orderItems.push(orderAdd)
        })
        order.totalPrice = order.orderItems.reduce((acc, item) => item.harga + acc, 0)
        const updateOrder = await order.save()
        res.send({ message: 'Pesanan Berhasil Ditambahkan', order: updateOrder })
    } else {
        res.status(404).send({ message: 'Order tidak ditemukan' })
    }


})

orderRouter.put('/:id/status', async (req, res) => {
    // const { status } = req.body
    const order = await Order.findById(req.params.id)
    if (order) {
        order.status = true

        const updateOrder = await order.save()
        res.status(201).json(updateOrder)
    } else {
        res.status(400)
        throw new Error("Order not Found")
    }

})
orderRouter.delete('/:id/order/:idMenu/menu', async (req, res) => {
    // const { status } = req.body
    // console.log(req.params);
    const idMenu = req.params.idMenu
    const order = await Order.updateOne({ _id: req.params.id }, { $pull: { orderItems: { _id: idMenu } } })

    res.send({ message: "Order Menu Berhasil DiBatalkan", order })


})

orderRouter.delete('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        const deleteOrder = await order.remove()
        res.send({ message: "Order Berhasil DiBatalkan", order: deleteOrder })
    } else {
        res.status(400)
        throw new Error("Order not Found")
    }

})





export default orderRouter