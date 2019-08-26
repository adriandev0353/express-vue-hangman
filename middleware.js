const jwt = require('jsonwebtoken');
const config = require('./config.js');

const checkToken = (req, res, next) => {
    let token = req.body;
    if (token) {
        token = Object.keys(token);
        token = token[0];

        console.log(token);

        try {
            var decoded = jwt.verify(token, config.secret);
            console.log(decoded);
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
