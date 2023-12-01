const { Types, Schema, model } = require("mongoose");

const boardgameSchema = new Schema({
    owner: { type: Types.ObjectId, ref: 'Users', required: true },
    name: { type: String, required: true },
    minage: { type: Number, required: true }, 
    minplayers: { type: Number, required: true },
    maxplayers: { type: Number, required: true },
    gameduration: { type: Number, required: true },
    description: { type: String, required: true },
    comments: [{ type: {}, required: true}],
    imageUrl: { type: String },
});

const Boardgames = model('Boardgames', boardgameSchema);
module.exports = Boardgames;