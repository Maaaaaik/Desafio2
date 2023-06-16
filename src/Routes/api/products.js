import { Router } from "express"
import Product from "../../models/products.model.js"

const router = Router()

router.post('/', async (req, res, next) => {
    try {
        let response = await Product.create(req.body)
        if (response) {
            return res.json({ status: 201, message: 'product created' })
        }
        return res.json({ status: 400, message: 'not created' })
    } catch (error) {
        next(error)
    }
})
router.get('/', async (req, res, next) => {
    let page = 1
    if (req.query.page) { page = req.query.page }
    let limit = req.query.limit ?? 10
    let title = req.query.title ? new RegExp(req.query.title, 'i') : ''
    let category = req.query.category ? new RegExp(req.query.category, 'i') : ''
    try {
        let products = await Product.paginate({ title, category }, { limit, page })
        if (products.length > 0) {
            return res.json({ status: 200, products })
        }
        let message = 'not found'
        return res.json({ status: 404, message })
    } catch (error) {
        next(error)
    }
})
router.get('/:pid', async (req, res, next) => {
    try {
        let id = req.params.pid
        let product = await Product.findById(id)
        if (product) {
            return res.json({ status: 200, product })
        }
        let message = 'not found'
        return res.json({ status: 404, message })
    } catch (error) {
        next(error)
    }
})
router.put('/:pid', async (req, res, next) => {
    try {
        let id = req.params.pid
        let data = req.body
        let response = await Product.findByIdAndUpdate(id, data)
        if (response) {
            return res.json({ status: 200, message: 'product updated' })
        }
        return res.json({ status: 404, message: 'not found' })
    } catch (error) {
        next(error)
    }
})
router.delete('/:pid', async (req, res, next) => {
    try {
        let id = req.params.pid
        let response = await Product.findByIdAndDelete(id)
        if (response) {
            return res.json({ status: 200, message: 'product deleted' })
        }
        return res.json({ status: 404, message: 'not found' })
    } catch (error) {
        next(error)
    }
})

export default router