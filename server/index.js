const express = require('express');
const routesConfig = require('./config/routes.js');
const databaseConfig = require('./config/database.js')

start();

async function start() {
    const app = express();

    await databaseConfig(app);
    routesConfig(app);

    app.listen(3000, () => { console.log('App listening on port 3000') });
}
