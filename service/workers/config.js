const FARM_OPTIONS     = {
    maxConcurrentWorkers        : require('os').cpus().length,
    maxCallsPerWorker           : Infinity,
    maxConcurrentCallsPerWorker : 1
};

module.exports = {
    FARM_OPTIONS
};
