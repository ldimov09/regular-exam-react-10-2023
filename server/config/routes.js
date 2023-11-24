const express = require("express");
const testController = require("../controllers/testController");
//let cors = require('cors');

module.exports = function (app) {
    app.use(express.json());
    app.use('/', testController);
}