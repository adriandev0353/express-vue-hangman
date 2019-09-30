const middleware = require('./middleware');
module.exports = (app, hangmanAPI) => {
    app.get('/', (req, res) => {
        res.send('This is the API server for my hangman game. welcome?');
    });
    app.get('/api/all/words', hangmanAPI.allWords);
    app.get('/api/all/new/words', middleware.checkToken, hangmanAPI.newWordList);
    app.get('/api/all/users', middleware.checkToken, hangmanAPI.allUsers);
    app.get('/api/list/size/:size', middleware.checkToken, hangmanAPI.listWordOfSize);
    app.get('/api/friend/requests/for/:user', middleware.checkToken, hangmanAPI.returnFriendRequests);
    app.get('/api/check/user/:user', middleware.checkToken, hangmanAPI.userCheck);
    app.get('/api/get/user/data/:user', middleware.checkToken, hangmanAPI.personalData);
    app.get('/api/find/user/:user', middleware.checkToken, hangmanAPI.findUser);
    app.get('/api/get/user/data/user/:user/choice/:choice', middleware.checkToken, hangmanAPI.choiceFilter);
    app.get('/api/check/word/:word', middleware.checkToken, hangmanAPI.checkWord);
    app.get('/api/link/data', middleware.checkToken, hangmanAPI.linkTableData);
    app.get('/api/friend/list/:user', middleware.checkToken, hangmanAPI.friendList);
    app.get('/api/fetch/challenges/for/:user', middleware.checkToken, hangmanAPI.fetchChallengesFor);
    app.get('/api/fetch/challenges/sent/by/:user', middleware.checkToken, hangmanAPI.fetchChallengesSentBy);
    app.get('/api/fetch/complete/challenges/by/:user', middleware.checkToken, hangmanAPI.fetchCompleteChallenges);
    app.post('/api/add/points/to', middleware.checkToken, hangmanAPI.addPointsTo);
    app.post('/api/set/challenge/status', middleware.checkToken, hangmanAPI.setChallengeStatus);
    app.post('/api/remove/challenge', middleware.checkToken, hangmanAPI.removeChallenge);
    app.post('/api/send/challenge', middleware.checkToken, hangmanAPI.sendChallenge);
    app.post('/api/remove/friend', middleware.checkToken, hangmanAPI.deleteFriend);
    app.post('/api/add/friends', middleware.checkToken, hangmanAPI.addFriends);
    app.post('/api/confirm/friend/request', middleware.checkToken, hangmanAPI.confirmRequest);
    app.post('/api/deny/friend/request', middleware.checkToken, hangmanAPI.denyRequest);
    app.post('/api/check/word/played', middleware.checkToken, hangmanAPI.checkWordsGuessed);
    app.post('/api/set/new/word/status', middleware.checkToken, hangmanAPI.setNewWordStatus);
    app.post('/api/store/new/word', middleware.checkToken, hangmanAPI.storeNewWord);
    app.post('/api/delete/user', middleware.checkToken, hangmanAPI.delUser);
    app.post('/api/token/check', middleware.checkToken, (req, res) => {
        res.json({
            success: true,
            message: 'Token authorized',
            user: req.decoded.user
        });
    });
    app.post('/api/login/check', hangmanAPI.loginCheck);
    app.post('/api/add/word/from/user', middleware.checkToken, hangmanAPI.addNewWord);
    app.post('/api/add/user', hangmanAPI.addUser);
    app.post('/api/add/to/user', middleware.checkToken, hangmanAPI.addWordTo);
};
