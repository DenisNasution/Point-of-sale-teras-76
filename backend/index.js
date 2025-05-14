import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDB from './config/db.js'
import menuRouter from './routers/menuRouter.js'
import orderRouter from './routers/orderRouter.js'
import tenantRouter from './routers/tenantRouter.js'
import tenantMenuRouter from './routers/tenantMenuRouter.js'
import menuSubMenuRouter from './routers/menuSubMenuRouter.js'
import userRouter from './routers/userRouter.js'
import tableRouter from './routers/tableRouter.js'

dotenv.config()
connectDB()
const app = express()

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(express.json())

// app.use(express.urlencoded({ extended: true }))

app.use('/api/menu', menuRouter)
app.use('/api/orders', orderRouter)
app.use('/api/tenants', tenantRouter)
app.use('/api/tenantsMenu', tenantMenuRouter)
app.use('/api/menuSubMenu', menuSubMenuRouter)
app.use('/api/user', userRouter)
app.use('/api/table', tableRouter)

const PORT = process.env.PORT
app.listen(PORT, console.log(`Server running in development on port ${PORT}`))