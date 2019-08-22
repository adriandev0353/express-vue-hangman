const bcrypt = require('bcrypt');
var saltRounds = 10;

module.exports = (hangmanService) => {
    const allWords = async (req, res) => {
        try {
            res.json({
                status: 'success',
                words: await hangmanService.allWords()
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const allUsers = async (req, res) => {
        try {
            res.json({
                status: 'success',
                words: await hangmanService.allUsers()
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const listWordOfSize = async (req, res) => {
        try {
            const size = req.params.size;
            res.json({
                status: 'success',
                words: await hangmanService.listWordOfSize(size)
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const addNewWord = async (req, res) => {
        try {
            const word = req.params.word;
            const addStatus = await hangmanService.addNewWord(word);
            res.json({
                status: addStatus
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const addUser = async (req, res) => {
        try {
            const details = req.body;
            const user = details.username;
            const pass = details.password;
            // password hashing
            // eslint-disable-next-line handle-callback-err
            bcrypt.hash(pass, saltRounds, async (err, hash) => {
                await hangmanService.addUser(user, hash);
            });
            res.json({
                status: 'success'
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const userCheck = async (req, res) => {
        try {
            const user = req.params.user;
            const result = await hangmanService.userCheck(user);
            res.json({
                status: 'success',
                message: result
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const loginCheck = async (req, res) => {
        try {
            let result = false;
            const details = req.body;
            const user = details.username;
            const pass = details.password;
            const hash = await hangmanService.loginCheck(user);
            // eslint-disable-next-line handle-callback-err
            result = bcrypt.compare(pass, hash);
            res.json({
                status: String(result)
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const addWordTo = async (req, res) => {
        try {
            const details = req.body;
            await hangmanService.addWordTo(details.username, details.word);
            res.json({
                status: 'success'
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const decrementPoints = async (req, res) => {
        try {
            const details = req.body;
            await hangmanService.decrementPoints(details.username, details.points);
            res.json({
                status: 'success'
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const returnError = (res, err) => {
        res.json({
            status: 'error',
            error: err.stack
        });
    };

    return {
        allWords,
        listWordOfSize,
        addNewWord,
        addUser,
        userCheck,
        addWordTo,
        decrementPoints,
        allUsers,
        loginCheck
    };
};
