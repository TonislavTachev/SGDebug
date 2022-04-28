const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createAndReadFile, multerStorage, buildSearchParams } = require('../../helpers');
const upload = multer({ storage: multerStorage });
const Request = require('../../models/Request');

const workers = require('../../workers');

/* POST upload log files */
router.post('/upload', upload.array('files', 3), async function(req, res) {
    const uploadedFile = req.files;
    res.json({ msg: uploadedFile[0].originalname });
    workers.dataUpload({
        fileName: uploadedFile[0].originalname,
        filePath: uploadedFile[0].path
    }, function(err, workerResult) {
        console.log('received worker result', JSON.stringify(workerResult));
    });
});

/* POST delete file */
router.post('/delete', async function(req, res) {
    const { fileName } = req.body;

    try {
        await Request.remove({ logFileOrigin: fileName });

        res.status(200).json({ msg: 'Successfully removed file' });
    } catch (error) {}
});

module.exports = router;