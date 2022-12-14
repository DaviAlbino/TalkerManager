const express = require('express');

const router = express.Router();
router.use(express.json());

const {
    read,
    talkerPostUtil,
    talkerPutUtil,
    talkerDeleteUtil,
    getSearchByName,
} = require('./util/utilFs');

const emailValidate = require('./middlewares/emailValidate');
const validatePassword = require('./middlewares/passwordValidate');
const tokenNumber = require('./util/generateToken');
const authorizatoin = require('./middlewares/authorization');
const nameValidate = require('./middlewares/nameValidate');
const ageValidate = require('./middlewares/ageValidate');
const talkValidate = require('./middlewares/talkValidate');
const ratingValidate = require('./middlewares/ratingValidate');
const watchedAtValidate = require('./middlewares/watchedAtValidate');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;
const HTTP_CREATED = 201;
const HTTP_DELETED = 204;
 
router.get('/talker', async (_req, res) => {
    const talkersRead = await read();
    res.status(HTTP_OK_STATUS).json(talkersRead);
});

router.get('/talker/search', authorizatoin, async (req, res) => {
    const newQuery = req.query.q;
    const getSearch = await getSearchByName(newQuery);
    res.status(HTTP_OK_STATUS).json(getSearch);
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

router.post('/login', emailValidate, validatePassword, async (req, res) => {
    // const login = { ...req.body };
    // console.log(login);
    // console.log(validatePassword());
    const token = tokenNumber();
    return res.status(HTTP_OK_STATUS).json({ token });
});

router.post('/talker',
authorizatoin,
nameValidate,
ageValidate,
talkValidate,
ratingValidate,
watchedAtValidate,
async (req, res) => {
    const newTalker = req.body;
    const postNewTalker = await talkerPostUtil(newTalker);
    res.status(HTTP_CREATED).json(postNewTalker);
});

router.put('/talker/:id',
authorizatoin,
nameValidate,
ageValidate,
talkValidate,
ratingValidate,
watchedAtValidate,
async (req, res) => {
    const id = Number(req.params.id);
    const newTalker = req.body;
    const putNewTalker = await talkerPutUtil(id, newTalker);
    console.log(putNewTalker);
    return res.status(HTTP_OK_STATUS).json(putNewTalker);
});

router.delete('/talker/:id', authorizatoin, async (req, res) => {
    const id = Number(req.params.id);
    await talkerDeleteUtil(id);
    return res.status(HTTP_DELETED).json();
});

module.exports = router;