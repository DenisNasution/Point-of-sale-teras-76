import bcrypt from 'bcryptjs'
// import { isSuperAdmin } from '../middleware/authMiddleware'
const users = [
    {
        name: "Denis",
        userName: "Denis",
        password: bcrypt.hashSync('1234', 10),
        isAdmin: true,
        isSuperAdmin: true
    },
    {
        name: "Jojo",
        userName: "Jojo",
        password: bcrypt.hashSync('1234', 10)
    },
    {
        name: "lulu",
        userName: "lulu",
        password: bcrypt.hashSync('1234', 10)
    },
]

export default users