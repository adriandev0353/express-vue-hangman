const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');
var saltRounds = 10;

module.exports = (hangmanService) => {
    const allWords = async (req, res) => {
        res.json({
            status: 'success',
            words: await hangmanService.allWords()
        });
    };

    const allUsers = async (req, res) => {
        res.json({
            status: 'success',
            words: await hangmanService.allUsers()
        });
    };

    const listWordOfSize = async (req, res) => {
        const size = req.params.size;
        res.json({
            status: 'success',
            words: await hangmanService.listWordOfSize(size)
        });
    };

    const addNewWord = async (req, res) => {
        const details = req.body;
        await hangmanService.addNewWord(details.word, details.user);
        res.json({
            status: 'success'
        });
    };

    const addUser = async (req, res) => {
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
    };

    const userCheck = async (req, res) => {
        const user = req.params.user;
        const result = await hangmanService.userCheck(user);
        res.json({
            status: 'success',
            message: result
        });
    };

    const personalData = async (req, res) => {
        const user = req.params.user;
        res.json({
            status: 'success',
            data: await hangmanService.personalData(user)
        });
    };

    const loginCheck = async (req, res) => {
        let result = false;
        let token;
        const details = req.body;
        const user = details.username;
        const pass = details.password;
        const hash = await hangmanService.loginCheck(user);

        if (hash !== 'Not found') {
            // eslint-disable-next-line handle-callback-err
            result = bcrypt.compareSync(pass, hash);
            if (result) {
                token = jwt.sign({ user }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.json({
                    auth: result,
                    token
                });
            } else {
                res.json({
                    auth: result,
                    message: 'Username or password incorrect'
                });
            }
        } else {
            res.json({
                auth: false,
                message: 'Username not found'
            });
        }
    };

    const addWordTo = async (req, res) => {
        const details = req.body;
        await hangmanService.addWordTo(details.username, details.word, details.state);
        res.json({
            status: 'success'
        });
    };

    const choiceFilter = async (req, res) => {
        const user = req.params.user;
        const choice = req.params.choice;
        const filter = await hangmanService.choiceFilter(user, choice);
        res.json({
            status: 'success',
            data: filter
        });
    };

    const linkTableData = async (req, res) => {
        res.json({
            status: 'success',
            items: await hangmanService.linkTableData()
        });
    };

    const setNewWordStatus = async (req, res) => {
        const details = req.body;
        await hangmanService.setNewWordStatus(details.word, details.status);
        res.json({
            status: 'success'
        });
    };

    const storeNewWord = async (req, res) => {
        const details = req.body;
        await hangmanService.storeNewWord(details.word, details.user);
        res.json({
            status: 'success'
        });
    };

    const newWordList = async (req, res) => {
        res.json({
            status: 'success',
            words: await hangmanService.newWordList()
        });
    };

    const checkWord = async (req, res) => {
        const word = req.params.word;
        res.json({
            status: 'success',
            check: await hangmanService.checkWord(word)
        });
    };

    const findUser = async (req, res) => {
        const user = req.params.user;
        res.json({
            status: 'success',
            user: await hangmanService.findUser(user)
        });
    };

    const delUser = async (req, res) => {
        const username = req.body.username;
        await hangmanService.delUser(username);
        res.json({
            status: 'success',
            users: await hangmanService.allUsers()
        });
    };

    const addFriends = async (req, res) => {
        const details = req.body;
        const result = await hangmanService.addFriends(details.requester, details.receiver);
        res.json({
            status: result
        });
    };

    const returnFriendRequests = async (req, res) => {
        const user = req.params.user;
        const result = await hangmanService.returnFriendRequests(user);
        res.json({
            result
        });
    };

    const checkWordsGuessed = async (req, res) => {
        const details = req.body;
        const result = await hangmanService.checkWordsGuessed(details.user, details.word);
        res.json({
            status: 'success',
            result
        });
    };

    const confirmRequest = async (req, res) => {
        const details = req.body;
        await hangmanService.confirmRequest(details.requester, details.receiver);
        res.json({
            status: 'success'
        });
    };

    const denyRequest = async (req, res) => {
        const details = req.body;
        await hangmanService.denyRequest(details.requester, details.receiver);
        res.json({
            status: 'success'
        });
    };

    const deleteFriend = async (req, res) => {
        const details = req.body;
        await hangmanService.deleteFriend(details.user, details.friend);
        res.json({
            status: 'success'
        });
    };

    const sendChallenge = async (req, res) => {
        const details = req.body;
        const status = await hangmanService.sendChallenge(details.challenger, details.opponent, details.word, details.hint);
        res.json({
            status
        });
    };

    const fetchChallengesFor = async (req, res) => {
        const user = req.params.user;
        const challenges = await hangmanService.fetchChallengesFor(user);
        res.json({
            status: 'success',
            challenges
        });
    };

    const fetchCompleteChallenges = async (req, res) => {
        const user = req.params.user;
        const results = await hangmanService.fetchCompleteChallenges(user);
        res.json({
            status: 'success',
            results
        });
    };

    const fetchChallengesSentBy = async (req, res) => {
        const user = req.params.user;
        const challenges = await hangmanService.fetchChallengesSentBy(user);
        res.json({
            status: 'success',
            challenges
        });
    };

    const friendList = async (req, res) => {
        const user = req.params.user;
        const list = await hangmanService.friendList(user);
        res.json({
            status: 'success',
            list
        });
    };

    const setChallengeStatus = async (req, res) => {
        const details = req.body;
        await hangmanService.setChallengeStatus(details.opponent, details.status, details.word);
        res.json({
            status: 'success'
        });
    };

    const removeChallenge = async (req, res) => {
        const details = req.body;
        await hangmanService.removeChallenge(details.opponent, details.word);
        res.json({
            status: 'success'
        });
    };

    const addPointsTo = async (req, res) => {
        const details = req.body;
        await hangmanService.addPointsTo(details.user, details.points);
        res.json({
            status: 'success'
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
        delUser,
        checkWord,
        storeNewWord,
        newWordList,
        setNewWordStatus,
        linkTableData,
        checkWordsGuessed,
        addFriends,
        returnFriendRequests,
        confirmRequest,
        denyRequest,
        friendList,
        deleteFriend,
        sendChallenge,
        fetchChallengesFor,
        fetchChallengesSentBy,
        fetchCompleteChallenges,
        setChallengeStatus,
        removeChallenge,
        addPointsTo
    };
};
