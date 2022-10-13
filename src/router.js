const express = require('express');
const emailValidate = require('./middlewares/emailValidate');
const validatePassword = require('./middlewares/passwordValidate');
const tokenNumber = require('./util/generateToken');

const router = express.Router();

const read = require('./util/utilFs');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;
 
router.get('/talker', async (_req, res) => {
    const talkersRead = await read();
    res.status(HTTP_OK_STATUS).json(talkersRead);
});

router.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talkersList = await read();
    const talkerId = talkersList.filter((talker) => talker.id === Number(id));
    if (talkerId.length > 0) {
        res.status(HTTP_OK_STATUS).json(talkerId[0]);
    } else {
        res.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    }
});

router.post('/login', emailValidate, validatePassword, async (_req, res) => {
    const token = tokenNumber();
    return res.status(200).json({ token });
});

module.exports = router;