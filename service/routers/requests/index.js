const express = require('express');
const router = express.Router();
const Request = require('../../models/Request');
const { buildSearchParams } = require('../../helpers');
const {
    getDistinctRequestAggregationPipeline,
    fetchAllRequestsPipeline
} = require('../aggregationHelpers');
const { CustomError } = require('../../errorHandler/CustomError');

/* GET fetch requests data */
router.post('/fetch', async function (req, res, next) {
    try {
        let { perPage, pageNumber, requestType, distinctRequestName, filters } = req.body;

        var pagination = {
            limit: perPage,
            skip: (pageNumber - 1) * perPage
        };

        let pipeline = fetchAllRequestsPipeline(
            requestType,
            pagination,
            distinctRequestName,
            filters
        );

        let data = await Request.aggregate(pipeline);

        let originalFileNames = await Request.aggregate([
            { $group: { _id: null, logFileOrigin: { $addToSet: '$logFileOrigin' } } },
            { $unwind: '$logFileOrigin' },
            { $project: { _id: 0 } }
        ]);

        await Promise.all([data, originalFileNames]);

        let filtersSupplied =
            filters !== undefined &&
            filters.range.every((item) => item !== null) &&
            filters.time.from !== '' &&
            filters.to !== '';

        if (filtersSupplied && data[0].data.length === 0) {
            return res.status(404).json({ msg: 'Cannot aggregate data with given parameteres' });
        }

        res.json({
            data: data[0].data,
            fileNames: originalFileNames,
            totalPages: Math.ceil(data[0]?.total[0]?.total / perPage)
        });
    } catch (error) {
        console.log(error);
        const newError = new CustomError('Cannot aggregate data with given parameteres', 500);
        res.status(404).json({ msg: newError.buildErrorMessage() });
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

        let filteredRequests = await Request.find({
            time: {
                $gte: dateAndTimeRange[0].timeFroм,
                $lt: dateAndTimeRange[1].timeTo
            },
            mtid: 'request'
        })
            .skip(pagination.skip)
            .limit(pagination.limit);

        res.json({ result: filteredRequests });
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
