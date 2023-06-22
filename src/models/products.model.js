import { model, Schema } from "mongoose";
import mongoosePaginate, { paginate } from "mongoose-paginate-v2";

let collection = "products"

let schema = new Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: false },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true }
})
schema.plugin(mongoosePaginate)
let Product = model(collection, schema)

export default Product