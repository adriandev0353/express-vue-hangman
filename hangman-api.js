const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');
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

    const personalData = async (req, res) => {
        try {
            const user = req.params.user;
            res.json({
                status: 'success',
                data: await hangmanService.personalData(user)
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const loginCheck = async (req, res) => {
        try {
            let result;
            let token;
            const details = req.body;
            const user = details.username;
            const pass = details.password;
            const hash = await hangmanService.loginCheck(user);
            // eslint-disable-next-line handle-callback-err
            result = bcrypt.compareSync(pass, hash);
            if (result) {
                token = jwt.sign({ user }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
            };
            res.json({
                auth: result,
                token
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const addWordTo = async (req, res) => {
        try {
            const details = req.body;
            await hangmanService.addWordTo(details.username, details.word, details.state);
            res.json({
                status: 'success'
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const choiceFilter = async (req, res) => {
        try {
            const user = req.params.user;
            const choice = req.params.choice;
            const filter = await hangmanService.choiceFilter(user, choice);
            res.json({
                status: 'success',
                data: filter
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const findUser = async (req, res) => {
        try {
            const user = req.params.user;
            res.json({
                status: 'success',
                user: await hangmanService.findUser(user)
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const delUser = async (req, res) => {
        try {
            const id = req.body.id;
            await hangmanService.delUser(id);
            res.json({
                status: 'success',
                users: await hangmanService.allUsers()
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
        allUsers,
        loginCheck,
        personalData,
        choiceFilter,
        findUser,
        delUser
    };
};
