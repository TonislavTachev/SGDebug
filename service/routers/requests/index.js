const express = require('express');
const router = express.Router();
const Request = require('../../models/Request');
const { buildSearchParams } = require('../../helpers');
const {
    getDistinctRequestAggregationPipeline,
    fetchAllRequestsPipeline
} = require('../aggregationHelpers');

/* GET fetch requests data */
router.post('/fetch', async function (req, res, next) {
    try {
        let { perPage, pageNumber, requestType, distinctRequestName } = req.body;

        var pagination = {
            limit: perPage,
            skip: (pageNumber - 1) * perPage
        };

        let pipeline = fetchAllRequestsPipeline(requestType, pagination, distinctRequestName);

        let data = await Request.aggregate(pipeline);

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
            data: data[0].data,
            startDate: data[0].startDate[0].time,
            endDate: data[0].endDate[0].time,
            fileNames: originalFileNames,
            totalPages: Math.ceil(data[0]?.total[0]?.total / perPage)
        });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
});

router.get('/get/:trace', async function (req, res) {
    try {
        let foundRequest = await Request.find({ trace: req.params.trace, mtid: 'response' });

        if (!foundRequest) {
            return res.json(404).json({ msg: 'Request not found' });
        }

        res.json(foundRequest).status(200);
    } catch (error) {
        res.json(error).status(500);
    }
});

router.post('/filter', async function (req, res) {
    try {
        let { perPage, pageNumber, filters } = req.body;

        var pagination = {
            limit: perPage,
            skip: perPage * (pageNumber - 1)
        };

        let dateAndTimeRange = buildSearchParams(filters);

        dateAndTimeRange.map((i) => console.log(new Date(i)));

        let filteredRequests = await Request.find({
            time: {
                $gte: new Date(dateAndTimeRange[0]),
                $lte: new Date(dateAndTimeRange[1])
            }
        });

        console.log(filteredRequests);

        res.json({ result: dateAndTimeRange });
    } catch (error) {
        console.log(error);
    }
});

router.post('/filter/methodName', async function (req, res) {
    let { requestType } = req.body;

    let searchPipeline = getDistinctRequestAggregationPipeline(requestType);

    let results = await Request.aggregate(searchPipeline);

    res.json(results);
});

// { time: { $gte: ISODate(`${dateAndTimeRange[0]}`) } },
// { time: { $lte: ISODate(`${dateAndTimeRange[1]}`) } }

module.exports = router;
