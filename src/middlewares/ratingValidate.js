const ratingValidate = (req, res, next) => {
    const { talk } = req.body;

    if (!talk.rate) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }

    if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }

    next();
};

module.exports = ratingValidate;