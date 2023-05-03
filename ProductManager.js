import * as fs from 'fs'
import { exit } from 'process'


class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
        this.init(path)
    }
    init(path) {
        let product = fs.existsSync(path)
        if (!product) {
            fs.writeFileSync(path, '[]')
            console.log('product created at path: ' + this.path)
            return 'product created at path: ' + this.path
        } else {
            this.products = JSON.parse(fs.readFileSync(path, 'UTF-8'))
            console.log('data recovered')
            return 'data recovered'
        }
    }
    async addProduct({ title, description, price, thumbnail, code, stock }) {
        try {
            let data = { title, description, price, thumbnail, code, stock }
            if (this.products.length > 0) {
                let next_id = this.products[this.products.length - 1].id + 1
                data.id = next_id
            } else {
                data.id = 1
            }
            this.products.push(data)
            let data_json = JSON.stringify(this.products, null, 2)
            await fs.promises.writeFile(this.path, data_json)
            console.log('id´s created product: ' + data.id)
            return 'id´s product: ' + data.id
        } catch (error) {
            console.log(error)
            return 'error: creating product'
        }
    }
    read_products() {
        return this.products
    }
    read_product(id) {
        let one = this.products.find(each => each.id === id)
        return one
    }
    async updateProduct(id, data) {
        try {
            let one = this.read_product(id)
            for (let prop in data) {
                one[prop] = data[prop]
            }
            let data_json = JSON.stringify(this.products, null, 2)
            await fs.promises.writeFile(this.path, data_json)
            console.log('updated product: ' + id)
            return 'updated product: ' + id
        } catch (error) {
            console.log(error)
            return 'error: updating product'
        }
    }

    async deleteProduct(id) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            throw new Error(`Product with id ${id} not found`);
        }
        this.products.splice(productIndex, 1);
    }

    async getProducts() {
        try {
            const products = this.products
            console.log(products)
            return products

        } catch (error) {
            return 'error: cannot find products'
        }

    }
    async getProductById(id) {
        const product = this.products.find((product) => product.id === id);

        if (!product) {
            console.log('error: cannot find products')
            return 'error: cannot find products'
        }

        return console.log(product)
    }

}

async function manager() {
    let manager = new ProductManager('./data/products.json')
    await manager.getProducts()
    await manager.addProduct({ title: "Jabon", description: "Jabon de tocador ultra seco", price: 150, thumbnail: "sin imagen", code: "code", stock: 1 })
    await manager.getProductById(2)
    await manager.getProductById(33)
    await manager.updateProduct(3, { name: 'pala' })
    await manager.deleteProduct(22)
}
export default manager