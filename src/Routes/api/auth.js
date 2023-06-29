import Router from "express";
import User from "../../models/users.model";
import validator from "../../middlewares/validator";
import password8 from "../../middlewares/password8";

const auth_router = Router()

auth_router.post('/register', validator, password8, async (req, res, next) => {
    try {
        await User.create(req.body)
        return res.status(201).json({
            success: true,
            message: "user created"
        })
    } catch (error) {
        next(error)
    }
})

auth_router.post('/signin', async (req, res, next) => {
    try {
        const { email } = req.body
        const one = await User.findOne({ email })
        if (one) {
            req.session.email = email
            req.session.role = one.role
            return res.status(200).json({
                success: true,
                message: "user signed in"
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
    } catch (error) {
        next(error)
    }
})

auth_router.post('/signout', async (req, res, next) => {
    try {
        req.session.destroy()
        return res.status(200).json({
            success: true,
            message: "user signed out"
        })
    } catch (error) {
        next(error)
    }
})
export default auth_router