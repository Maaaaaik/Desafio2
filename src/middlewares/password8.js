function password8(req, res, next) {
    const { password } = req.body
    if (password.lenght >= 8) {
        next()
    }
    return res.status(200).json({
        succes: false,
        message: "password, must have at least 8 caracters"
    })
}
export default password8