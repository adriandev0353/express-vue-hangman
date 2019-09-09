const middleware = require('./middleware');
const session = require('express-session');

module.exports = (app, hangmanAPI) => {
    app.use(session({
        secret: 'yikes',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
    }));

    const checkUser = (req, res, next) => {
        if (req.session.username) {
            return next();
        }
        res.redirect('/');
    };

    app.get('/', (req, res) => {
        res.send('This is the API server for my hangman game. welcome?');
    });
    app.get('/api/all/words', checkUser, hangmanAPI.allWords);
    app.get('/api/all/new/words', checkUser, hangmanAPI.newWordList);
    app.get('/api/all/users', checkUser, hangmanAPI.allUsers);
    app.get('/api/list/size/:size', checkUser, hangmanAPI.listWordOfSize);
    app.get('/api/friend/requests/for/:user', checkUser, hangmanAPI.returnFriendRequests);
    app.get('/api/check/user/:user', checkUser, hangmanAPI.userCheck);
    app.get('/api/get/user/data/:user', checkUser, hangmanAPI.personalData);
    app.get('/api/find/user/:user', checkUser, hangmanAPI.findUser);
    app.get('/api/get/user/data/user/:user/choice/:choice', checkUser, hangmanAPI.choiceFilter);
    app.get('/api/check/word/:word', checkUser, hangmanAPI.checkWord);
    app.get('/api/link/data', checkUser, hangmanAPI.linkTableData);
    app.post('/api/add/friends', checkUser, hangmanAPI.addFriends);
    app.post('/api/test/session', hangmanAPI.testSession);
    app.post('/api/check/word/played', checkUser, hangmanAPI.checkWordsGuessed);
    app.post('/api/set/new/word/status', checkUser, hangmanAPI.setNewWordStatus);
    app.post('/api/store/new/word', checkUser, hangmanAPI.storeNewWord);
    app.post('/api/delete/user', checkUser, hangmanAPI.delUser);
    app.post('/api/token/check', middleware.checkToken, (req, res) => {
        res.json({
            success: true,
            message: 'Token authorized',
            user: req.decoded.user
        });
    });
    app.post('/api/login/check', hangmanAPI.loginCheck);
    app.post('/api/add/word/from/user', checkUser, hangmanAPI.addNewWord);
    app.post('/api/add/user', checkUser, hangmanAPI.addUser);
    app.post('/api/add/to/user', checkUser, hangmanAPI.addWordTo);
    app.post('/api/logout', checkUser, hangmanAPI.logout);
};
