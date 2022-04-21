const express = require('express');
const app = express();

const { Connection } = require('./MongoConnection');
require('dotenv').config({ path: __dirname + '/.env' });
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.NODE_DOCKER_PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));

app.use('/api', require('./routers'));

app.listen(port, async () => {
    console.log(`Listening on port ${port}`);
    Connection.open();
});

module.exports = app;
