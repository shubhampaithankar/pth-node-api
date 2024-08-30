import { model, Schema } from "mongoose";

export default model('Battle', new Schema({
    player1: { type: Schema.Types.ObjectId, ref: 'Player' },
    player2: { type: Schema.Types.ObjectId, ref: 'Player' },
    turn: { type: Schema.Types.ObjectId, ref: 'Player' },
    state: Object,
}))