const express = require("express");
const testController = require("../controllers/testController");
const authContoller = require("../controllers/authContorller");
//let cors = require('cors');

module.exports = function (app) {
    app.use(express.json());
    app.use('/', testController);
    app.use('/api/auth/', authContoller);
}