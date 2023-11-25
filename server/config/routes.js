const express = require("express");
const authContoller = require("../controllers/authContorller");
const cors = require('cors');
const boardgameController = require("../controllers/boardGameController");
//let cors = require('cors');

module.exports = function (app) {
    app.use(cors());

    app.use(express.json());
    app.use('/api/auth/', authContoller);
    app.use('/api/games/', boardgameController);
}