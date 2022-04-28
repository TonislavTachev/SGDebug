const path = require('path');
const dotenvFilePath = path.resolve(__dirname, '../..', '/.env');
require('dotenv').config({ path: dotenvFilePath });

const { createAndReadFile } = require('../../helpers');

const { Connection } = require('../../MongoConnection');

/*
  input has shape of {fileName, filePath}
*/
module.exports = function (input, callback) {
    const err = null, result = {...input, workerFinished: true};
    Connection.open().then(db => {
      let result = createAndReadFile(input.filePath, input.fileName);
      result.then((data) => {
        callback(err, result);
      });
    });
  }