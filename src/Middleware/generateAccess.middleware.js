const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (username) {
    return jwt.sign(username, process.env.TOKEN_SECRET);
};
