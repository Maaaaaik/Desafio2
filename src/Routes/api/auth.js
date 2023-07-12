import Router from "express";
import User from "../../models/users.model.js";
import validator from "../../middlewares/validator.js";
import password8 from "../../middlewares/password8.js";
import create_hash from "../../middlewares/create_hash.js";
import is_valid_password from "../../middlewares/is_valid_password.js";
import passport from "passport";

const auth_router = Router()
auth_router.post('/register',
    validator,
    password8,
    create_hash,
    passport.authenticate(
        'register',
        { failureRedirect: '/api/auth/fail-register' }
    ),
    (req, res) => res.status(201).json({
        success: true,
        message: "user created"
    })
)

auth_router.get('/fail-register', (req, res) => res.status(401).json({
    success: false,
    message: 'auth error'
}))

auth_router.post('/signin', password8, passport.authenticate('signin', { failureRedirect: '/api/auth/fail-signin' }), is_valid_password, (req, res, next) => {
    try {
        const { email } = req.body
        req.session.email = email
        req.session.role = one.role
        return res.status(200).json({
            success: true,
            message: "user signed in"
        })
    } catch (error) {
        next(error)
    }
})

auth_router.get('/fail-signin', (req, res) => res.status(401).json({
    success: false,
    message: 'auth error'
}))


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