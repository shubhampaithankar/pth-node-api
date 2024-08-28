import { Schema, model } from "mongoose"

export default model("users", new Schema({
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
}))