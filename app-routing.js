const middleware = require('./middleware');
module.exports = (app, hangmanAPI) => {
    app.get('/', (req, res) => {
        res.send('This is the API server for my hangman game. welcome?');
    });
    app.get('/api/all/words', hangmanAPI.allWords);
    app.get('/api/all/new/words', hangmanAPI.newWordList);
    app.get('/api/all/users', hangmanAPI.allUsers);
    app.get('/api/list/size/:size', hangmanAPI.listWordOfSize);
    app.get('/api/check/user/:user', hangmanAPI.userCheck);
    app.get('/api/get/user/data/:user', hangmanAPI.personalData);
    app.get('/api/find/user/:user', hangmanAPI.findUser);
    app.get('/api/get/user/data/user/:user/choice/:choice', hangmanAPI.choiceFilter);
    app.get('/api/check/word/:word', hangmanAPI.checkWord);
    app.get('/api/link/data', hangmanAPI.linkTableData);
    app.post('/api/check/word/played', hangmanAPI.checkWordsGuessed);
    app.post('/api/set/new/word/status', hangmanAPI.setNewWordStatus);
    app.post('/api/store/new/word', hangmanAPI.storeNewWord);
    app.post('/api/delete/user', hangmanAPI.delUser);
    app.post('/api/token/check', middleware.checkToken, (req, res) => {
        res.json({
            success: true,
            message: 'Token authorized',
            user: req.decoded.user
        });
    });
    app.post('/api/login/check', hangmanAPI.loginCheck);
    app.post('/api/add/word/from/user', hangmanAPI.addNewWord);
    app.post('/api/add/user', hangmanAPI.addUser);
    app.post('/api/add/to/user', hangmanAPI.addWordTo);
};
