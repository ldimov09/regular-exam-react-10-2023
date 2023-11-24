const express = require("express");
const testController = require("../controllers/testController");
const authContoller = require("../controllers/authContorller");
const cors = require('cors');
//let cors = require('cors');

module.exports = function (app) {
    app.use(cors());

    app.use(express.json());
    app.use('/', testController);
    app.use('/api/auth/', authContoller);
}