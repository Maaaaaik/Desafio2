import express from "express"
import ProductManager from "./ProductManager.js"
import Cart from "./CartManager.js"

let productManager = new ProductManager('./data/products.json')
let cart = new Cart(".data/cart.json")

let server = express()
let PORT = 8080

let ready = () => console.log("server ready on port 8080")

server.listen(PORT, ready)
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

let index_route = '/products'
let index_function = (req, res) => {
    let products = productManager.read_products()
    console.log(products)
    return res.send({
        success: true,
        products
    })
}
server.get(index_route, index_function)

let one_route = '/product/:pid'
let one_function = (request, response) => {
    let parametros = request.params
    let pid = Number(parametros.pid)
    console.log(pid)
    console.log(typeof pid)
    let one = productManager.read_product(pid)
    console.log(one)
    if (one) {
        return response.send({
            success: true,
            product: one
        })
    } else {
        return response.send({
            success: false,
            user: 'not found'
        })
    }

}
server.get(one_route, one_function)

let query_route = '/products'
let query_function = (req, res) => {
    console.log(req.query)
    let quantity = parseInt(req.query.quantity) || 5
    let products = productManager.read_products().slice(0, quantity)
    if (products.length > 0) {
        return res.send({
            success: true,
            products
        })
    } else {
        return res.send({
            success: false,
            product: 'not found'
        })
    }
}
server.get(query_route, query_function)

server.post(index_route,
    async (req, res) => {
        try {
            let title = req.body.title ?? null
            let description = req.body.description ?? null
            let price = req.body.price ?? null
            let thumbnail = req.body.thumbnail ?? null
            let code = req.body.code ?? null
            let stock = req.body.stock ?? null
            let ok = title && description && price && thumbnail && code && stock
            if (ok) {
                let product = await productManager.addProduct({ title, description, price, thumbnail, code, stock })
                return res.json({
                    status: 201,
                    product_id: product.id,
                    message: "created"
                })
            } else {
                return res.json({
                    status: 404,
                    message: "Complete all the data"
                })
            }
        } catch (error) {
            return res.json({
                status: 500,
                message: error
            }

            )
        }

    })

server.put(
    "/product/:pid",
    (req, res) => {
        let id = Number(req.params.pid)
        let data = req.body
        if (id && data) {

            productManager.updateProduct(id, data)
            return res.json({
                success: true,
                message: "Product updated!"
            })
        } else {
            return res.json({
                status: 400,
                message: "Check data!"
            })

        }
    })

server.delete(
    "/product/:pid",
    (req, res) => {
        try {
            let id = Number(req.params.pid)
            if (id) {
                productManager.deleteProduct(id)
                return res.json({
                    success: true,
                    message: "Product deleted"
                })
            } else {
                return res.json({
                    status: 400,
                    message: "Check data!"
                })
            }
        } catch (error) {
            return res.json({
                status: 500,
                message: error
            })
        }
    })

server.post("/cart",
    (res) => {

        cart.add_cart()
        return res.json({
            status: 400,
            message: "Cart created"
        })

    })

server.get("/cart/:cid",
    (req, res) => {
        if (id) {
            let cart = cart.read_cart(id)
            return res.json({
                succes: true,
                message: cart
            })
        } else {
            return res.json({
                status: 404,
                message: "not found"
            })
        }
    })

server.post("/cart/:cid/product/:pid",
    (req, res) => {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const productQuantity = parseInt(req.body.quantity);

        const cart = carts.find((cart) => cart.id === cartId);
        if (!cart) return res.status(404).send('Cart not found');

        const product = {
            id: productId
        };

        for (let i = 0; i < productQuantity; i++) {
            cart.products.push(product);
        }

        saveCarts();
        res.send(cart);
    }
)
