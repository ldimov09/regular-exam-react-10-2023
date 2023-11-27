const { register, getAllUsers, getUserById, login } = require('../services/authService');
const authContoller = require('express').Router();


authContoller.post('/register', async function (req, res) {
    console.log('POST /register');
    try{
        const body = req.body;
        const user = await register(body.email, body.username, body.password);
        res.send(JSON.stringify({
            result: user,
            success: true,
        }));
    } catch (err) {
        res.send(JSON.stringify({
            success: false,
            error: err.message,
        })); 
    } 
});

authContoller.get('/users', async (req, res) => {
    console.log('POST /users');
    const allUsers = await getAllUsers();
    res.send({
        success: true,
        result: allUsers,
    });
});

authContoller.post('/login', async (req, res) => {
    console.log('POST /login');
    const loginUser = {
        email: req.body.email,
        password: req.body.password,
    }
    try{
        const user = await login(loginUser);
        res.send({
            success: true,
            result: user,
        })

    }catch(err) {
        res.send({
            success: false,
            error: err.message
        })
    }

})

authContoller.get('/users/:id', async (req, res) => {
    console.log('GET /users/:id');
    const user = await getUserById(req.params.id);
    res.send({success: true, result: user});
})


module.exports = authContoller;