const fs = require('fs');
const readline = require('readline');
const multer = require('multer');
const Request = require('./models/Request');
const { format } = require('date-fns');

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

const buildSearchParams = (frontendParams) => {
    let dateRange = [...frontendParams.range];
    let timeRange = frontendParams.time;

    let formattedTime = getTimeFromTimeStamp(timeRange);

    let filteredArray = dateRange.map((item, index) => {
        // let timeRange = formattedTime[index === 0 ? 'from' : 'to'];
        let date = format(new Date(item), 'yyyy-MM-dd');
        // const dtDateOnly = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
        // console.log(dtDateOnly);
        return date;
    });

    return filteredArray.map((item, index) => ({
        timeFroм: index === 0 && `${item}${formattedTime['from']}`,
        timeTo: index === 1 && `${item}${formattedTime['to']}`
    }));
};

const getTimeFromTimeStamp = (timeRange) => {
    Object.keys(timeRange).map((key, index) => {
        let date = new Date(timeRange[key]);
        timeRange[key] = format(date, "'T'HH:mm:ss.sss'Z'");
    });

    return timeRange;
};

module.exports = { createAndReadFile, multerStorage, buildSearchParams };
