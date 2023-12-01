const express = require('express');
const routesConfig = require('./config/routes.js');
const databaseConfig = require('./config/database.js');
const path = require('path');

start();

async function start() {
    const app = express();

    await databaseConfig(app);
    routesConfig(app);
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    app.listen(3000, () => { console.log('App listening on port 3000') });
}
