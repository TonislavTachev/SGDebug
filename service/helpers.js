const fs = require('fs');
const readline = require('readline');
const multer = require('multer');
const Request = require('./models/Request');

const createAndReadFile = async (filePath, fileName) => {
    //create a read stream of the File
    let fileStream = fs.createReadStream(filePath, 'utf8');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const promises = [];

    for await (const line of rl) {
        let parsedJSONLine = JSON.parse(line);
        if (parsedJSONLine['context'] === 'swagger port') {
            parsedJSONLine.logFileOrigin = fileName;
            promises.push(convertToDbFormat(parsedJSONLine));
        }
    }

    return Promise.all(promises).then(function (converted) {
        return addToDBBatch(converted);
    });
};

const addToDBBatch = (jsonRequest) => {
    Request.collection.insertMany(jsonRequest, onInsert);
};

const onInsert = (err, docs) => {
    if (err) {
        // TODO: handle error
    } else {
        console.info('%d Requests were successfully stored.', docs.length);
    }
};

const convertToDbFormat = (request) => {
    return new Request(request);
};

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

module.exports = { createAndReadFile, multerStorage };
