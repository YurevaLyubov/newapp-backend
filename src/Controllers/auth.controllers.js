const StringCrypto = require('string-crypto');
require('dotenv').config();
const User = require('../Models/user');
const generateAccessToken = require('../Middleware/generateAccess.middleware');

const { encryptString, decryptString } = new StringCrypto();

const DEFAULT_ROLE = 'user';

const auth = function (req, res) {
    if (!req.body) return res.sendStatus(400);

    const userLogin = req.body.login;
    const userEmail = req.body.email;
    let userPassword = req.body.password;
    userPassword = encryptString(userPassword, process.env.SALT);
    const userName = req.body.name;
    const userAge = req.body.age;

    const user = new User({
        login: userLogin,
        email: userEmail,
        password: userPassword,
        name: userName,
        age: userAge,
        role: DEFAULT_ROLE,
    });

    user.save(function (err, user) {
        if (err) return res.status(400).send({ message: 'Такой логин уже существует!' });
        res.send(user);
    });
};

const login = function (req, res) {
    if (!req.body) return res.sendStatus(400);

    const userLogin = req.body.login;
    const userPassword = req.body.password;

    User.findOne({ login: userLogin }, function (err, user) {
        if (err || !user) return res.status(401).send({ message: 'Пользователь не найден' });

        const passwordUser = decryptString(user.password, process.env.SALT);

        if (passwordUser === userPassword) {
            const token = generateAccessToken({ id: user._id, login: user.login });
            res.send({ token, user });
        } else {
            res.status(401).send({ message: 'Неверный пароль!' });
        }
    });
};

module.exports = {
    auth,
    login,
};
