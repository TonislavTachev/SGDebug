const path = require('path');
const zlib = require('zlib');
const fs = require('fs');
const utils = require('utils');

const readFile = utils.promisify(fs.readFile);
const writeFile = utils.promisify(fs.writeFile);
const gunzip = utils.promisify(zlib.gunzip);

const checkIfCompressed = filename => path.parse(filename).ext === '.gz';

const removeFileExtension = filename => path.parse(filename).name;

const getFileBuffer = async (filename) => {
    readFile(filename)
};

const unzipFile = async filename => {
    if (checkIfCompressed(filename)) {
        const newFileName = removeFileExtension(filename);
        const unzipedBuff = await gunzip(await getFileBuffer(filename), {});
        await writeFile(newFileName, unzipedBuff);
        return newFileName;
    } else {
        return filename;
    }
}

module.exports = {
    unzipFile,
    add
};
