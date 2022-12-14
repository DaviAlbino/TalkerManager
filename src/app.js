const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

const router = require('./router');

app.use('/', router);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
    response.status(HTTP_OK_STATUS).send();
});

module.exports = app;