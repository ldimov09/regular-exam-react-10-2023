const User = require('../models/users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const JST_SECRET = '0WIMu2TA}u(De1/Ga{wneQl`1*m:bX5BIiVVG}^l%G=8z!x~X#QwbhExLbF?ZQMlB?7A_0xOGhhbqn}uwO,CMf%ilJ/F';

async function register({email, username, password, profileimage}) {
    const existingEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existingEmail) {
        throw new Error('Email Taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        hashedPassword,
        username,
        profileimage
    });

    const result = createSession(user);

    return result;
}

async function createSession({ _id, email, username, profileimage }) {
    const payload = {
        _id,
        email, 
        username,
        profileimage
    }

    const token = jwt.sign(payload, JST_SECRET);

    payload.token = token;

    return payload;
}

async function getAllUsers() {
    const result = User.find({}).lean();
    return result;
}

async function getUserById(id) {
    return User.findById(id).lean();
}

async function login({email, password}) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Incorrect email or password!');
    }
    
    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    
    if (!hasMatch) {
        throw new Error('Incorrect email or password!');
    }
    return await createSession(user);
}

function verifyToken(token) {
    return jwt.verify(token, JST_SECRET);
}

async function getById(id) {
    return User.findById(id).lean();
}


module.exports = {
    register: register,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    login: login,
    verifyToken:verifyToken,
    getById: getById
}
