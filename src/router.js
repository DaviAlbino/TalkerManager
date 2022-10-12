const express = require('express');

const router = express.Router();

const read = require('./util/utilFs');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;
 
router.get('/', async (_req, res) => {
    const talkersRead = await read();
    res.status(HTTP_OK_STATUS).json(talkersRead);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkersList = await read();
    const talkerId = talkersList.filter((talker) => talker.id === Number(id));
    if (talkerId.length > 0) {
        res.status(HTTP_OK_STATUS).json(talkerId[0]);
    } else {
        res.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    }
});

module.exports = router;