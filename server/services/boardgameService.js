const Boardgames = require("../models/boardgames");
const Comments = require("../models/comments");

async function getAll() {
    return await Boardgames.find({}).lean();
}

async function create(boardgame) {
    return await Boardgames.create(boardgame);
}

async function update(id, boardgame) {
    const existing = await Boardgames.findById(id);

    if(!existing){
        throw new Error("Boardgame doesn't exist");
    }

    existing.name = boardgame.name;
    existing.description = boardgame.description;
    existing.salary = boardgame.salary;

    return await existing.save();
}

async function getById(id) {
    const boardgame = await Boardgames.findById(id).lean();
    boardgame.comments = await Comments.find({ boardgameId: id}).lean();
    return boardgame;
}

async function deleteById(id) {
    await Boardgames.findOneAndDelete({ _id: id });
    return await Comments.deleteMany({ boardgameId: id});
}

async function getGamesByUserId(id) {
    return await Boardgames.find({ owner: id }).lean();
}
module.exports = {
    create,
    update,
    getAll,
    getById,
    deleteById,
    getGamesByUserId: getGamesByUserId
}

