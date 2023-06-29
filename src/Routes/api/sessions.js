import { Router } from "express"

const session_router = Router()

session_router.get('/', async (req, res) => {
    if (!req.session.counter) { req.session.counter = 1 }
    else { req.session.counter++ }
    return res.status(200).json({
        message: `han ingresado ${req.session.counter} ususarios`
    })
})

session_router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body
        req.session.email = email
        return req.status(200).json({
            success: true,
            message: email + "ha inciado sesion"
        })
    } catch (error) {
        next(error)
    }
})

router.post('/signout', async (req, res, next) => {
    try {
        req.session.destroy()
        return res.status(200).json({
            message: "ha cerrado sesion"
        })
    } catch (error) {
        next(error)
    }
})

export default session_router