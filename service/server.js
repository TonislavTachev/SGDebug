const express = require('express');
const app = express;
require('dotenv').config({ path: __dirname + '/.env' });
const bodyParser = require('body-parser');
const connection = require('./db');
const port = process.env.NODE_DOCKER_PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, async () => {
    console.log(`Listening on port ${port}`);
    try {
        await connection.authenticate();
    } catch (error) {
        console.error('Unable to connect', error);
    }
});
