const { verifyToken } = require("../services/authService");
const { getAll, create, getById, update, deleteById, getGamesByUserId } = require("../services/boardgameService");
const boardgameController = require('express').Router();

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

boardgameController.get('/', async (req, res) => {
    console.log('GET /games/');
    try {
        const result = await getAll();
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

boardgameController.get('/user/:id', async (req, res) => {
    console.log('GET /games/user/:id');
    try {
        const token = req.headers["x-authorization"];
        const user = verifyToken(token)
        const result = await getGamesByUserId(req.params.id);
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

boardgameController.post('/create', upload.single('gameImage'), async (req, res) => {
    console.log('POST /games/create');
    try {
        const token = req.headers["x-authorization"];
        const user = verifyToken(token)
        const payload = {
            name: req.body.name,
            minage: req.body.minage,
            gameduration: req.body.gameduration,
            minplayers: req.body.minplayers,
            maxplayers: req.body.maxplayers,
            description: req.body.description,
            imageUrl: req.file.filename,
            owner: user._id
        }
        const result = await create(payload);
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
boardgameController.get('/:id', async (req, res) => {
    console.log('GET /games/:id');
    try {
        const token = req.headers["x-authorization"];
        verifyToken(token);
        const result = await getById(req.params.id);
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

boardgameController.post('/:id/edit',upload.single('gameImage'), async (req, res) => {
    console.log('POST /games/:id/edit', req.body);
    try {
        const token = req.headers["x-authorization"];
        verifyToken(token);
        const payload = {
            name: req.body.name,
            minage: req.body.minage,
            gameduration: req.body.gameduration,
            minplayers: req.body.minplayers,
            maxplayers: req.body.maxplayers,
            description: req.body.description,
            imageUrl: req.file? req.file.filename : null,
        }
        const result = await update(req.params.id, payload);
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
});

boardgameController.get('/:id/delete', async (req, res) => {
    console.log('GET /games/:id/delete');
    try {
        console.log(req.params.id);
        const token = req.headers["x-authorization"];
        verifyToken(token);
        const result = await deleteById(req.params.id);
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
});
module.exports = boardgameController;