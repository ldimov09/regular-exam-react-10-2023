const { verifyToken } = require("../services/authService");
const { getAll, create, getById } = require("../services/boardgameService");
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
    try{ 
        const token = req.headers["x-authorization"];
        verifyToken(token);
        const result = await getById(req.params.id);
        res.send({
            success: true,
            result: result
        });
    } catch (err) {
        res.send({
            success: false,
            error: err.message
        })
    }
})
module.exports = boardgameController;
/*

*/
/*
jobController.put('/jobs/react', async (req, res) => {
    try{
        const token = req.headers["authorization"];
        verifyToken(token);
        const result = await updateJobReaction(req.body);
        res.send({
            success: true,
            result: result
        })
    } catch (err) {
        res.send({
            success: false,
            error: err.message,
        })
    }
})

jobController.put('/jobs/apply', async (req, res) => {
    try{
        const token = req.headers["authorization"];
        verifyToken(token);
        
        const result = await updateUserApplications(req.body)
        res.send({
            success: true,
            result: result,
        });

    }catch(err){
        res.send({ 
            success: false,
            error: err.message,
        })

    }



})

jobController.put('/jobs/favor', async (req, res) => {

    try{
        const token = req.headers["authorization"];
        verifyToken(token);
        
        const result = await updateUserFavorite(req.body)
        res.send({
            success: true,
            result: result,
        });

    }catch(err){
        res.send({ 
            success: false,
            error: err.message,
        })

    }
})

jobController.delete('/jobs/:id', async (req,res) => {

    try{
        const token = req.headers["authorization"];
        verifyToken(token);
        
        const id = req.params.id;
        const result = await deleteById(id);

        res.send({
            success: true,
            result: result,
        });

    }catch(err){
        res.send({ 
            success: false,
            error: err.message,
        })

    }

})
jobController.put('/jobs/edit/:id', async (req, res) => {
    try{
        const token = req.headers["authorization"];
        verifyToken(token);
        
        const id = req.params.id;
        const result = await updateById(id, req.body);

        res.send({
            success: true,
            result: result,
        });

    }catch(err){
        res.send({ 
            success: false,
            error: err.message,
        })

    }
})

*/