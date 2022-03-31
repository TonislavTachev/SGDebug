const express = require('express');
const app = express();
const multer = require('multer');
const { createAndReadFile, multerStorage } = require('./helpers');
const upload = multer({ storage: multerStorage });
const { Connection } = require('./MongoConnection');
require('dotenv').config({ path: __dirname + '/.env' });
const cors = require('cors');
const bodyParser = require('body-parser');
const Request = require('./models/Request');

const port = process.env.NODE_DOCKER_PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));

app.post('/upload', upload.single('file'), async (req, res) => {
    const uploadedFile = req.file;
    // createAndReadFile(uploadedFile.path);
    res.json({ msg: uploadedFile.originalname });
});

app.get('/fetchRequests', async (req, res) => {
    try {
        let data = await Request.aggregate([
            { $match: { mtid: 'request' } },
            { $sample: { size: 10 } }
        ]);
        res.json({ data: data, length: data.length });
    } catch (error) {
        res.status(500).json(error);
    }
});

app.listen(port, async () => {
    console.log(`Listening on port ${port}`);
    Connection.open();
});
