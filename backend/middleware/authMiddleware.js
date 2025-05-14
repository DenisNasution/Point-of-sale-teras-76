import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        userName: user.userName,
        isAdmin: user.isAdmin,
        isSuperAdmin: user.isSuperAdmin
    },
        process.env.JWT_SECRET || 'teras76palingkece', {
        expiresIn: '30d'
    }
    )
}

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization
    if (authorization) {
        const token = authorization.slice(7, authorization.length)
        jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err, decode) => {
                if (err) {
                    res.status(401).send({ message: 'Invalid Token' })
                } else {
                    req.user = decode
                    next()
                }
            }
        )
    } else {
        res.status(401).send({ message: 'No Token' })
    }
}
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).send({ message: 'Invalid Admin Token' })
    }
}

export const isSuperAdmin = (req, res, next) => {
    if (req.user && req.user.isSuperAdmin) {
        next()
    } else {
        res.status(401).send({ message: 'Invalid Super Admin Token' })
    }
}