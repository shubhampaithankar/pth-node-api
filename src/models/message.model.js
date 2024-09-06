import { model, Schema } from "mongoose";

export default model('Message', new Schema({
    from: String,
    to: String,
    message: String,
    date: Date
}))