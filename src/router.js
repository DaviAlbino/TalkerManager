const express = require('express');
const path = require('path');

const router = express.Router();

const fs = require('fs').promises;

const read = async () => {
    try {
        const file = await fs.readFile(path.resolve(__dirname, '../talker.json'));
        return JSON.parse(file);
    } catch (error) {
        return null;
    }
};

router.get('/', async (_req, res) => {
    const talkersRead = await read();
    console.log(talkersRead);
    res.status(200).json(talkersRead);
});

module.exports = router;