const fs = require('fs');
const readline = require('readline');
const multer = require('multer');
const Request = require('./models/Request');

const createAndReadFile = async (filePath) => {
    //create a read stream of the File
    let fileStream = fs.createReadStream(filePath, 'utf8');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        let parsedJSONLine = JSON.parse(line);

        if (parsedJSONLine['context'] === 'swagger port') {
            createAndAddToDB(parsedJSONLine);
        }
    }
};

const createAndAddToDB = async (jsonRequest) => {
    try {
        let request = new Request(jsonRequest);

        await request.save();
    } catch (error) {}
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
