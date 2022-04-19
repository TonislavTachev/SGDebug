const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createAndReadFile, multerStorage, buildSearchParams } = require('../../helpers');
const upload = multer({ storage: multerStorage });
const Request = require('../../models/Request');

/* POST upload log files */
router.post('/upload', upload.array('files', 3), async function(req, res) {
    const uploadedFile = req.files;
    let result = createAndReadFile(uploadedFile[0].path, uploadedFile[0].originalname);
    result.then((data) => {
        res.json({ msg: uploadedFile[0].originalname });
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