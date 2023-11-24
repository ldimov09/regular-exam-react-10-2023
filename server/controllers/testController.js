const testController = require('express').Router();

testController.get('/', function (req, res) {
    res.send(JSON.stringify({ test: "Hello world! 2" }));
});

module.exports = testController;