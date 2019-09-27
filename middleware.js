const jwt = require('jsonwebtoken');
const config = require('./config.js');

const checkToken = (req, res, next) => {
    const token = req.headers.auth;
    if (token) {
        try {
            var decoded = jwt.verify(token, config.secret);
            req.decoded = decoded;
            next();
        } catch (err) {
            return res.json({
                success: false,
                message: 'Token not valid'
            });
        };
    } else {
        return res.json({
            success: false,
            message: 'No auth token generated'
        });
    }
};

module.exports = {
    checkToken: checkToken
};
