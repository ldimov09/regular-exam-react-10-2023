const { verifyToken } = require("../services/authService");
const { create, destroy } = require("../services/commentService");
const commentsContorller = require('express').Router();

commentsContorller.post('/:id', async (req, res) => {
    console.log('POST /games/comment/:id');
    try {
        const token = req.headers["x-authorization"];
        const user = verifyToken(token)
        req.body = {
            ...req.body,
            userId: user._id,
            boardgameId: req.params.id,
            username: user.username,
            profileimage: user.profileimage
        }
        const result = await create(req.body);
        res.status(200).send({
            success: true,
            result: result
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            error: err.message
        })
    }
})


commentsContorller.get('/:id/delete', async (req, res) => {
    console.log('GET /games/comment/:id/delete');
    try {
        const token = req.headers["x-authorization"];
        const user = verifyToken(token)
        const result = await destroy(req.params.id);
        res.status(200).send({
            success: true,
            result: result
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            error: err.message
        })
    }
})

module.exports = commentsContorller;