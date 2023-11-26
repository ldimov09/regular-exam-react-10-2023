const Boardgames = require("../models/boardgames");

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
    return await Boardgames.findById(id).lean();
}

async function deleteById(id) {
    return await Boardgames.findOneAndDelete({ _id: id });
}
module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
}