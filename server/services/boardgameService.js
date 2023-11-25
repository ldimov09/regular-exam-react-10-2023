const Boardgames = require("../models/boardgames");

async function getAll() {
    return await Boardgames.find({}).lean();
}

async function create(boardgame) {
    return await Boardgames.create(boardgame);
}

async function getById(id) {
    return await Boardgames.findById(id).lean();
}

module.exports = {
    getAll,
    getById,
    create
}