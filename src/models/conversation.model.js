import { model, Schema } from "mongoose";

export default model('Conversation', new Schema(
	{
		participants: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		messages: [
			{
				type: Schema.Types.ObjectId,
				ref: "Message",
				default: [],
			},
		],
	},
	{ timestamps: true }
))