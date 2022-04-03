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
    createAndReadFile(uploadedFile.path, uploadedFile.originalname);
    res.json({ msg: uploadedFile.originalname });
});

app.post('/fetchRequests', async (req, res) => {
    try {
        let { perPage, pageNumber } = req.body;

        var pagination = {
            limit: perPage,
            skip: perPage * (pageNumber - 1)
        };

        let data = await Request.aggregate([
            { $match: { mtid: 'request' } },
            {
                $facet: {
                    data: [{ $skip: pagination.skip }, { $limit: pagination.limit }]
                }
            }
        ]);

        res.json({ data: data[0].data });
    } catch (error) {
        res.status(500).json({ errorMessage: error });
    }
});

app.get('/fetchRequests/:id', async (req, res) => {
    try {
        let foundRequest = await Request.findById(req.params.id);

        if (!foundRequest) {
            return res.json(404).json({ msg: 'Request not found' });
        }

        res.json(foundRequest).status(200);
    } catch (error) {
        res.json(error).status(500);
    }
});

app.listen(port, async () => {
    console.log(`Listening on port ${port}`);
    Connection.open();
});
