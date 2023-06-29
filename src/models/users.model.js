import { Schema, model } from "mongoose";

const collection = 'users'
const schema = new Schema({
    name: { type: String, requred: true },
    photo: { type: String, default: 'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png' },
    email: { type: String, required: true, index: true, unique: true },
    age: { type: Number },
    role: { type: Number, default: '0' },
    password: { type: String, required: true }

})

const User = model(collection, schema)
export default User