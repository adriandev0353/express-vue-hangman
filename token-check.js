const jwt = require('jsonwebtoken');
const config = require('./config.js');

const checkToken = (req, res, next) => {
    const token = req.headers.auth;
    const user = req.headers.user;
    if (token && user) {
        try {
            var decoded = jwt.verify(token, config.secret);
            req.decoded = decoded;
            if (user === decoded.user) {
                next();
            } else {
                return res.json({
                    success: false,
                    message: "User doesn't match token"
                });
            }
        } catch (err) {
            return res.json({
                success: false,
                message: 'Token not valid'
            });
        };
    } else {
        return res.sendStatus(401);
    }
};

module.exports = {
    checkToken: checkToken
};
