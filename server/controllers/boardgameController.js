const { verifyToken } = require("../services/authService");
const { getAll, create, getById, update, deleteById } = require("../services/boardgameService");
const boardgameController = require('express').Router();

boardgameController.get('/', async (req, res) => {
    console.log('GET /games/');
    try{ 
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

boardgameController.post('/create', async (req, res) => {
    console.log('GET /games/create');
    try {
        const token = req.headers["x-authorization"];
        const user = verifyToken(token)
        req.body = {
            ...req.body,
            owner: user._id
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
boardgameController.get('/:id', async (req, res) => {
    console.log('GET /games/:id');
    try{ 
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

boardgameController.post('/:id/edit', async (req, res) => {
    console.log('POST /games/:id/edit');
    try{ 
        const token = req.headers["x-authorization"];
        verifyToken(token);
        const result = await update(req.params.id, req.body);
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
    try{ 
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