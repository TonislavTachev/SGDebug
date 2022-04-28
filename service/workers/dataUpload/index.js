const workerFarm = require('worker-farm');
const { FARM_OPTIONS } = require('../config');
const workers = workerFarm(FARM_OPTIONS, require.resolve('./child'));

module.exports = workers;
