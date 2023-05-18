import { Router } from "express"
import manager from "../../managers/Cart.js"

const router = Router()

router.post('/', async (req, res, next) => {
    try {
        let response = await manager.add_cart(req.body)
        if (response === 201) {
            return res.json({ status: 201, message: 'cart created' })
        }
        return res.json({ status: 400, message: 'not created' })
    } catch (error) {
        next(error)
    }
})

router.post('/:cid/product/:pid', async (req, res, next) => {
    try {
        let cartId = Number(req.params.cid);
        let productId = Number(req.params.pid);

        let cart = manager.read_cart(cartId);
        if (!cart) {
            return res.json({ status: 404, message: 'Cart not found' });
        }

        let existingProduct = cart.products.find(product => product.product === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await manager.update_cart(cartId, cart);

        return res.json({ status: 200, message: 'Product added to cart' });
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        let all = manager.read_carts()
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
        let id = Number(req.params.pid)
        let one = manager.read_cart(id)
        if (one) {
            return res.json({ status: 200, one })
        }
        let message = 'not found'
        return res.json({ status: 404, message })
    } catch (error) {
        next(error)
    }
})
router.put('/:pid', async (req, res, next) => {
    try {
        let id = Number(req.params.pid)
        let data = req.body
        let response = await manager.update_cart(id, data)
        if (response === 200) {
            return res.json({ status: 200, message: 'cart updated' })
        }
        return res.json({ status: 404, message: 'not found' })
    } catch (error) {
        next(error)
    }
})
router.delete('/:pid', async (req, res, next) => {
    try {
        let id = Number(req.params.pid)
        let response = await manager.destroy_cart(id)
        if (response === 200) {
            return res.json({ status: 200, message: 'cart deleted' })
        }
        return res.json({ status: 404, message: 'not found' })
    } catch (error) {
        next(error)
    }
})

export default router