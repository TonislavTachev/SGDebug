const mongoose = require('mongoose');

const logFileSchema = new mongoose.Schema({
    logFileName: String
});

module.exports = mongoose.model('LogFileOrigin', logFileSchema);
