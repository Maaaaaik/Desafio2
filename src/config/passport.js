import passport from 'passport'
import { Strategy } from "passport"
import User from "../models/users.model.js"

export default function () {
    passport.serializeUser(
        (user, done) => done(null, user._id)
    )
    passport.deserializeUser(
        async (id, done) => {
            const user = await User.findById(id)
            return done(null, user)
        }
    )
    passport.use(
        'register',
        new Strategy(
            { passReqToCallback: true, usernameField: 'email' },
            async (req, username, password, done) => {
                try {
                    let one = await User.findOne({ email: username })
                    if (!one) {
                        let user = await User.create(req.body)
                        return done(null, user)
                    }
                    return done(null, false)
                } catch (error) {
                    return done(error, false)
                }
            }
        )
    )
}