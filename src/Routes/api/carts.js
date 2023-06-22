import { Router } from "express"
import Cart from "../../models/carts.model.js"

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        let all = await Cart.find()
        if (all.length > 0) {
            return res.json({ status: 200, all })
        }
        let message = 'not found'
        return res.json({ status: 404, message })
    } catch (error) {
        next(error)
    }
})

router.get('/:cid', async (req, res, next) => {
    try {
        let id = req.params.pid
        let one = await Cart.findById(id)
        if (one) {
            return res.json({ status: 200, one })
        }
        let message = 'not found'
        return res.json({ status: 404, message })
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        let response = await Cart.create(req.body)
        if (response) {
            return res.json({ status: 201, message: 'cart created' })
        }
        return res.json({ status: 400, message: 'not created' })
    } catch (error) {
        next(error)
    }
})

router.post('/:cid/product/:pid', async (req, res, next) => {
    try {
        let cartId = req.params.cid;
        let productId = Number(req.params.pid);

        let cart = Cart.findById(cartId);
        if (!cart) {
            return res.json({ status: 404, message: 'Cart not found' });
        }

        let existingProduct = cart.products.find(product => product.product === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await Cart.findByIdAndUpdate(cartId, cart);

        return res.json({ status: 200, message: 'Product added to cart' });
    } catch (error) {
        next(error);
    }
});


router.put('/:pid', async (req, res, next) => {
    try {
        let id = req.params.pid
        let data = req.body
        let response = await Cart.findByIdAndUpdate(id, data)
        if (response) {
            return res.json({ status: 200, message: 'cart updated' })
        }
        return res.json({ status: 404, message: 'not found' })
    } catch (error) {
        next(error)
    }
})

router.delete('/:pid', async (req, res, next) => {
    try {
        let id = req.params.pid
        let response = await Cart.findByIdAndDelete(id)
        if (response) {
            return res.json({ status: 200, message: 'cart deleted' })
        }
        return res.json({ status: 404, message: 'not found' })
    } catch (error) {
        next(error)
    }
})



export default router