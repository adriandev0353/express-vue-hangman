module.exports = (app, hangmanAPI) => {
    app.get('/api/all/words', hangmanAPI.allWords);
    app.get('/api/all/users', hangmanAPI.allUsers);
    app.get('/api/list/size/:size', hangmanAPI.listWordOfSize);
    app.get('/api/add/word/:word', hangmanAPI.addNewWord);
    app.post('/api/add/word/:word', hangmanAPI.addNewWord);
    app.post('/api/add/user', hangmanAPI.addUser);
    app.post('/api/dec/points', hangmanAPI.decrementPoints);
};
