const middleWare = require('./token-middleware');
module.exports = (app, hangmanAPI) => {
    app.get('/', (req, res) => {
        res.send('This is the API server for my hangman game. welcome?');
    });
    app.get('/api/all/words', hangmanAPI.allWords);
    app.get('/api/all/users', hangmanAPI.allUsers);
    app.get('/api/list/size/:size', hangmanAPI.listWordOfSize);
    app.get('/api/check/user/:user', hangmanAPI.userCheck);
    app.get('/api/token/check', middleWare);
    app.post('/api/login/check', hangmanAPI.loginCheck);
    app.post('/api/add/word/:word', hangmanAPI.addNewWord);
    app.post('/api/add/user', hangmanAPI.addUser);
    app.post('/api/add/to/user', hangmanAPI.addWordTo);
    app.post('/api/dec/points', hangmanAPI.decrementPoints);
};
