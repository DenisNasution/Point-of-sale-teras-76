import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import user from '../Data/user.js'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import { generateToken, isAdmin, isAuth, isSuperAdmin } from '../middleware/authMiddleware.js'

const userRouter = express()
userRouter.get('/seed', async (req, res) => {
    const createdUsers = await User.insertMany(user)
    res.send({ createdUsers })
})

userRouter.get('/', expressAsyncHandler(async (req, res) => {
    const users = await User.find({ isSuperAdmin: false })
    if (users) {
        res.send(users)
    }
    res.status(401).send({ message: "Data Tidak ditemukan" })
}))

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ userName: req.body.userName })
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                userName: user.userName,
                isAdmin: user.isAdmin,
                isSuperAdmin: user.isSuperAdmin,
                token: generateToken(user)
            })
            return
        }
    }
    res.status(401).send({ message: "Invalid userName or password" })
}))

userRouter.post('/register', async (req, res) => {
    const number = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
    const user = new User({
        name: req.body.name,
        userName: req.body.name + number,
        password: bcrypt.hashSync('1234', 10),
        isAdmin: false

    })
    const createdUser = await user.save()
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        userName: createdUser.userName,
        isAdmin: createdUser.isAdmin,
        isSuperAdmin: createdUser.isSuperAdmin,

    })
})
userRouter.delete('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        if (user.isSuperAdmin) {
            res.status(400).send({ message: "Can not Delete Super Admin User" })
            return
        }
        const deleteUser = await user.remove()
        res.send({ message: 'User deleted', user: { deleteUser } })
    } else {
        res.status(400).send({ message: 'User not found' })
    }
}))

userRouter.put('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    const number = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
    if (user) {
        user.name = req.body.name || user.name
        user.userName = req.body.name + number || user.userName
        user.isAdmin = req.body.isAdmin
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 10)
        }
        const updateUser = await user.save()
        res.send({ message: 'User Updated', user: updateUser })
    } else {
        res.status(400).send({ message: 'User Not Found' })
    }

}))

userRouter.get('/:id/profile', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    res.send(user)
    // if (user) {
    //     res.send({ message: 'User find', user })
    // } else {
    //     res.status(400).send({ message: 'User Not Found' })
    // }

}))
userRouter.put('/:id/profile', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        user.name = req.body.name
        user.userName = req.body.userName
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 10)
        }
        const updateUser = await user.save()
        res.send({ message: 'User Updated', user: updateUser })
    } else {
        res.status(400).send({ message: 'User Not Found' })
    }

}))

export default userRouter