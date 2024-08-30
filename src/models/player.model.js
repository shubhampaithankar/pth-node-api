import { model, Schema } from "mongoose";

export default model('Player', new Schema({
    socketId: String,
    name: String,
    pokemon: Array,
    activePokemonIndex: Number,
}))