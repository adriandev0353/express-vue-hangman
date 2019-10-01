const jwt = require('jsonwebtoken');
const config = require('./config.js');

const checkToken = (req, res, next) => {
    const token = req.headers.auth;
    const user = req.body.user;
    if (token && user) {
        try {
            var decoded = jwt.verify(token, config.secret);
            console.log(user, decoded.user);
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
        return res.json({
            success: false,
            message: 'Not authorized to do that'
        });
    }
};

module.exports = {
    checkToken: checkToken
};
