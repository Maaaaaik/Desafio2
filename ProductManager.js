
fs = require("fs")
class ProductManager {
    constructor(path) {
        this.products = []
        this.path = "./entregable2/data"
    }
    init() {
        let fileExist = fs.fileExist(path)
        if (!fileExist) {
            fs.promises.writeFile(path, "[]")
                .then(res => console.log("Archivo creado"))
                .catch(err => console.log(err))
        } else {
            fs.promises.readFile(path)
                .then(rez => this.products = JSON.parse(res))
                .catch(err)
        }
    }
    addProducts({ title, description, price, thumbnail, code, stock }) {

        let product = { title, description, price, thumbnail, code, stock, id }
        this.products.push(product)
        let id = 0
        if (this.products.length === 0) {
            id = 1
        } else {
            let lastProduct = this.products[this.products.length - 1]
            id = lastProduct.id + 1
        }
        let dataJSON = JSON.stringify(this.product, null, 2)

        fs.promises.writeFile(this.path, dataJSON)
            .then(res => "Producto agregado")
            .catch(err)
    }
}
