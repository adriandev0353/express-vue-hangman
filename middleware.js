const jwt = require('jsonwebtoken');
const config = require('./config.js');

const checkToken = (req, res, next) => {
    console.log(req.token, 'token');
    console.log(req.headers, 'headers');
    let token = req.body;
    if (token) {
        token = Object.keys(token);
        token = token[0];

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
