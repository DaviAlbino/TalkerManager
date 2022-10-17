const validatePassword = async (req, res, next) => {
    const { password } = await req.body;

    const SIX = 6;

    if (!password) {
        return res.status(400).json({
            message: 'O campo "password" é obrigatório',
        });
    }

    if (password.length < SIX) {
        return res.status(400).json({
            message: 'O "password" deve ter pelo menos 6 caracteres',
        });
    }

    return next();
};

module.exports = validatePassword;