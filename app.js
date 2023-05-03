import { express } from "express"
import manager from "./ProductManager.js"
let server = express()
let PORT = 8080

let ready = () => console.log("server ready on port 8080")

server.listen(PORT, ready)
server.use(express.urlencoded({ extended: true }))

let index_route = '/products'
let index_function = (req, res) => {
    let products = manager.read_products()
    console.log(products)
    return res.send(`there are ${products} products`)
}
server.get(index_route, index_function)

let one_route = '/products/:pid'
let one_function = (request, response) => {
    let parametros = request.params
    let pid = Number(parametros.pid)
    console.log(pid)
    console.log(typeof pid)
    let one = manager.read_product(pid)
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
    let quantity = req.query.quantity ?? 5
    let products = manager.read_products().slice(0, quantity)
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