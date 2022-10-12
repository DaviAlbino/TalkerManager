const express = require('express');

const router = express.Router();

const read = require('./util/utilFs');

router.get('/', async (_req, res) => {
    const talkersRead = await read();
    console.log(talkersRead);
    res.status(200).json(talkersRead);
});

module.exports = router;