const { Types, Schema, model } = require("mongoose");

const commentSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'Users', required: true },
    boardgameId: { type: Types.ObjectId, ref: 'Boardgames', required: true },
    username: { type: String, required: true },
    content: { type: String, required: true },
    profileimage: { type: String, required: true },
}, { timestamps: true });

const Comments = model('Comments', commentSchema);
module.exports = Comments;