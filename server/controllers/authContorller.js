const { register, getAllUsers, login, getById, changePassword, updateUser } = require('../services/authService');
const authContoller = require('express').Router();
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

authContoller.post('/register', upload.single('profileimage'), async function (req, res) {
    console.log('POST /register');
    try {
        const payload = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            profileimage: req.file.filename
        }
        const user = await register(payload);
        res.send(JSON.stringify({
            result: user,
            success: true,
        }));
    } catch (err) {
        console.log(err.message);
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
    try {
        const user = await login(loginUser);
        res.send({
            success: true,
            result: user,
        })

    } catch (err) {
        res.send({
            success: false,
            error: err.message
        })
    }

})

authContoller.get('/users/:id', async (req, res) => {
    console.log('GET /auth/:id');
    try{ 
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
});

authContoller.post('/users/:id/edit', upload.single('profileimage'), async (req, res) => {
    console.log('POST /auth/users/:id/edit');
    try {
        const payload = {
            username: req.body.username,
            profileimage: req.file? req.file.filename : null
        }
        const user = await updateUser(req.params.id, payload);
        res.send(JSON.stringify({
            result: user,
            success: true,
        }));
    } catch (err) {
        console.log(err.message);
        res.send(JSON.stringify({
            success: false,
            error: err.message,
        }));
    }
});

authContoller.post('/users/:id/changepassword', async (req, res) => {
    console.log('POST /auth/users/:id/changepassword');
    try{ 
        const result = await changePassword(req.params.id, req.body);
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
module.exports = authContoller;