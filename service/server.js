const express = require('express');
const app = express();
const multer = require('multer');
const { createAndReadFile, multerStorage, buildSearchParams } = require('./helpers');
const upload = multer({ storage: multerStorage });
const { Connection } = require('./MongoConnection');
require('dotenv').config({ path: __dirname + '/.env' });
const cors = require('cors');
const bodyParser = require('body-parser');
const Request = require('./models/Request');
const LogFileOrigin = require('./models/LogFileOrigin');

const port = process.env.NODE_DOCKER_PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));

app.post('/upload', upload.array('files', 3), async (req, res) => {
    const uploadedFile = req.files;
    let result = createAndReadFile(uploadedFile[0].path, uploadedFile[0].originalname);
    result.then((data) => {
        res.json({ msg: uploadedFile[0].originalname });
    });
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
            { $sort: { time: 1 } },
            {
                $facet: {
                    data: [{ $skip: pagination.skip }, { $limit: pagination.limit }],
                    total: [{ $count: 'total' }]
                }
            }
        ]);

        let originalFileNames = await Request.aggregate([
            { $group: { _id: null, logFileOrigin: { $addToSet: '$logFileOrigin' } } },
            { $unwind: '$logFileOrigin' },
            { $project: { _id: 0 } }
        ]);

        let result = await Promise.all([data, originalFileNames]);

        // let converted = await Request.aggregate([
        //     {
        //         $project: {
        //             meta: {
        //                 $getField: {
        //                     field: { $literal: '$meta' },
        //                     input: '$$ROOT'
        //                 }
        //             },
        //             doc: '$$ROOT',
        //             time: {
        //                 $toDate: '$time'
        //             }
        //         }
        //     },

        //     {
        //         $group: {
        //             _id: '$meta.trace',
        //             count: { $count: {} },
        //             requests: {
        //                 $push: '$doc'
        //             }
        //         }
        //     },
        //
        //     {
        //         $facet: {
        //             data: [{ $skip: pagination.skip }, { $limit: pagination.limit }],
        //             startDate: [{ $sort: { time: 1 } }, { $limit: 1 }],
        //             endDate: [{ $sort: { time: -1 } }, { $limit: 1 }]
        //         }
        //     }
        // ]);

        res.json({
            data: result[0][0].data,
            // startDate: result[0][0].startDate[0].time,
            // endDate: result[0][0].endDate[0].time,
            fileNames: result[1],
            totalPages: result[0][0].total[0].total
        });
    } catch (error) {
        console.log(error);
        res.status(500);
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

app.post('/filterRequests', async (req, res) => {
    let { perPage, pageNumber, filters } = req.body;

    var pagination = {
        limit: perPage,
        skip: perPage * (pageNumber - 1)
    };

    let dateAndTimeRange = buildSearchParams(filters);

    try {
        let filteredRequests = await Request.aggregate([
            {
                $match: {
                    $and: [
                        { time: { $gte: ISODate(`${dateAndTimeRange[0]}`) } },
                        { time: { $lte: ISODate(`${dateAndTimeRange[1]}`) } }
                    ]
                }
            }
        ]);

        res.status(200).json(filteredRequests);
    } catch (error) {
        res.json(error);
    }
});

app.post('/deleteFile', async (req, res) => {
    const { fileName } = req.body;

    try {
        await Request.remove({ logFileOrigin: fileName });

        res.status(200).json({ msg: 'Successfully removed file' });
    } catch (error) {}
});

app.listen(port, async () => {
    console.log(`Listening on port ${port}`);
    Connection.open();
});
