import { Schema, model } from "mongoose"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    pokemon: [{
        type: String,
        required: false
    }]
})
export default model("users", userSchema)