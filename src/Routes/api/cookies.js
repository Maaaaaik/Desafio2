import Router from 'express'

const cookies_router = Router()

cookies_router.get('/set', (req, res) => {

    return res.status(200).cookie(
        'Nombre-de-la-clave',
        'Valor-de-la-clave'
    ).json({
        success: true,
        message: 'Cookie seteada'
    })
})

cookies_router.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        cookies: req.cookies
    })
})

cookies_router.get('/get', (req, res) => {
    return res.status(200).json({
        success: true,
        cookie: req.signedCookies
    })
})

cookies_router.get('/delete', (req, res) => {
    return res.status(200).clearCookie('clave').json({
        success: true,
        message: 'cookie deleted'
    })
})



export default cookies_router