const { buildSearchParams } = require('../helpers');

const getDistinctRequestAggregationPipeline = (requestType) => {
    let types = {
        swagger: 'request',
        error: 'error'
    };

    if (requestType === 'swagger') {
        return [
            {
                $match: {
                    mtid: types[requestType],
                    'body.method': { $exists: true },
                    'body.params.channel': { $eq: 'web' }
                }
            },
            {
                $group: { _id: null, distinctName: { $addToSet: '$body.method' } }
            },
            {
                $unwind: '$distinctName'
            },
            {
                $project: { _id: 0 }
            }
        ];
    } else if (requestType === 'error') {
        return [
            {
                $match: {
                    mtid: types[requestType],
                    error: { $exists: true }
                }
            },
            {
                $group: { _id: null, distinctName: { $addToSet: '$error.type' } }
            },
            {
                $unwind: '$distinctName'
            },
            {
                $project: { _id: 0 }
            }
        ];
    }
};

const fetchAllRequestsPipeline = (requestType, pagination, distinctMethodNames, filters) => {
    let types = {
        swagger: 'request',
        error: 'error'
    };

    let typesPipeline = {
        swagger: [{ 'body.params.channel': { $eq: 'web' } }],

        error: [{ error: { $exists: true } }]
    };

    let dateAndTimeRange = [];
    let timePipeline = {};

    if (filters !== undefined) {
        dateAndTimeRange = buildSearchParams(filters);
        timePipeline = {
            time: {
                $gte: dateAndTimeRange[0].timeFroм,
                $lt: dateAndTimeRange[1].timeTo
            }
        };
    }

    if (distinctMethodNames === undefined || distinctMethodNames.value === '') {
        return [
            {
                $match: {
                    $and: [
                        {
                            $or: [{ mtid: types[requestType] }],
                            $or: typesPipeline[requestType],
                            ...(filters !== undefined
                                ? {
                                      time: {
                                          $gte: dateAndTimeRange[0].timeFroм,
                                          $lt: dateAndTimeRange[1].timeTo
                                      }
                                  }
                                : {})
                        }
                    ]
                }
            },
            { $sort: { time: 1 } },
            {
                $facet: {
                    data: [{ $skip: pagination.skip }, { $limit: pagination.limit }],
                    startDate: [{ $sort: { time: 1 } }, { $limit: 1 }],
                    endDate: [{ $sort: { time: -1 } }, { $limit: 1 }],
                    total: [{ $count: 'total' }]
                }
            }
        ];
    } else {
        let distinctTypesPipelines = {
            swagger: { 'body.method': distinctMethodNames.value },
            error: { 'error.type': distinctMethodNames.value }
        };

        return [
            {
                $match: {
                    $and: [
                        {
                            $or: [{ mtid: types[requestType] }],
                            $or: typesPipeline[requestType]
                        }
                    ],
                    ...distinctTypesPipelines[requestType]
                }
            },
            { $sort: { time: 1 } },
            {
                $facet: {
                    data: [{ $skip: pagination.skip }, { $limit: pagination.limit }],
                    startDate: [{ $sort: { time: 1 } }, { $limit: 1 }],
                    endDate: [{ $sort: { time: -1 } }, { $limit: 1 }],
                    total: [{ $count: 'total' }]
                }
            }
        ];
    }
};

module.exports = { getDistinctRequestAggregationPipeline, fetchAllRequestsPipeline };
