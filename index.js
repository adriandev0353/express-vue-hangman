'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const wordList = require('./word.json');
const HangmanAPI = require('./hangman-api');
const HangmanService = require('./hangman-service');
const AppRouting = require('./app-routing');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors());

const pg = require('pg');
const Pool = pg.Pool;

let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/hangman';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

const hangmanService = HangmanService(pool);
const hangmanAPI = HangmanAPI(hangmanService);

const handlebarSetup = exphbs({
    partialsDir: './views',
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.RELOAD_DATA) {
    console.log('About to reload data');
    hangmanService.reloadData(wordList);
} else {
    console.log('Data not reloaded');
};

AppRouting(app, hangmanAPI);

let players = 0;
let users = { playerOne: '', playerTwo: '', spectators: [] };
let wordLength = 0;
let playersWords = {};
let guesses = { wordGuessedOne: [], wordGuessedTwo: [] };

io.on('connection', socket => {
    socket.on('check', user => {
        if (user !== users.playerOne) {
            if (players < 2) {
                players++;
                if (players === 1) {
                    users.playerOne = user;
                } else if (players === 2) {
                    users.playerTwo = user;
                    io.emit('lobbyFull', { players, users });
                };
            } else {
                users.spectators.push(user);
            }
            socket.emit('checkResponse', { players, users });
        } else {
            socket.emit('checkResponse', 'already connected');
        }
    });
    socket.on('playersWords', data => {
        playersWords = data;
    });
    socket.on('letterCheck', data => {
        const letter = data.letter;
        const user = data.user;
        let word = playersWords[user];
        var isCorrect = false;
        word = word.toLowerCase();
        const guess = letter.toLowerCase();
        for (let i = 0; i < word.length; i++) {
            if (guess === word[i]) {
                if (user === 'one') {
                    guesses.wordGuessedOne[i] = guess;
                } else if (user === 'two') {
                    guesses.wordGuessedTwo[i] = guess;
                }
                isCorrect = true;
            } else if (word[i] === '-') {
                if (user === 'one') {
                    guesses.wordGuessedOne[i] = '-';
                } else if (user === 'two') {
                    guesses.wordGuessedTwo[i] = '-';
                }
            } else {
                if (user === 'one') {
                    guesses.wordGuessedOne[i] = '_';
                } else if (user === 'two') {
                    guesses.wordGuessedTwo[i] = '_';
                }
            }
        }
        io.emit('guesses', { one: guesses.wordGuessedOne, two: guesses.wordGuessedTwo, isCorrect });
    });
    socket.on('clear', () => {
        players = 0;
        users = { playerOne: '', playerTwo: '', spectators: [] };
        wordLength = 0;
        playersWords = {};
        guesses = { wordGuessedOne: [], wordGuessedTwo: [] };
    });
    socket.on('lengthReq', () => {
        if (wordLength === 0) {
            wordLength = Math.floor(Math.random() * 10) + 2;
        };
        socket.emit('lengthRes', wordLength);
    });
});

var PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log('App started on port:', PORT);
});
