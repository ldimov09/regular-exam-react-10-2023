const express = require("express");
const authContoller = require("../controllers/authContorller");
const cors = require('cors');
const path = require('path');
const boardgameController = require("../controllers/boardGameController");
const commentsContoller = require("../controllers/commentController");

module.exports = function (app) {
    app.use(cors());
    app.use(express.json());
    app.use('/api/auth/', authContoller);
    app.use('/api/games/', boardgameController);
    app.use('/api/games/comment', commentsContoller);
}